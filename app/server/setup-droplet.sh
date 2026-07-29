#!/bin/bash
# ============================================================
# KONQR server setup — paste this whole file into DigitalOcean
# "Advanced options → Add Initialization scripts (User data)"
# when creating the droplet (Ubuntu 24.04, Basic $6/mo).
#
# >>> EDIT THIS ONE LINE before pasting: <<<
DOMAIN="your-name.duckdns.org"
# ============================================================
set -euxo pipefail
exec > /var/log/konqr-setup.log 2>&1

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y unzip sqlite3 curl debian-keyring debian-archive-keyring apt-transport-https

# ---------- PocketBase ----------
PB_VERSION="0.28.4"
mkdir -p /opt/pocketbase/pb_data /opt/pocketbase/pb_migrations /opt/pocketbase/backups
cd /opt/pocketbase
curl -fsSL -o pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip"
unzip -o pb.zip pocketbase
rm pb.zip
chmod +x pocketbase

# ---------- KONQR schema migration ----------
cat > /opt/pocketbase/pb_migrations/1753760000_init_konqr.js <<'MIGRATION'
/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const snapshots = new Collection({
      name: "snapshots",
      type: "base",
      fields: [
        { name: "owner", type: "relation", required: true, maxSelect: 1,
          collectionId: app.findCollectionByNameOrId("users").id, cascadeDelete: true },
        { name: "data", type: "json", maxSize: 5242880 },
        { name: "savedAt", type: "autodate", onCreate: true, onUpdate: true },
      ],
      indexes: ["CREATE UNIQUE INDEX idx_snapshots_owner ON snapshots (owner)"],
      listRule: "owner = @request.auth.id",
      viewRule: "owner = @request.auth.id",
      createRule: "@request.auth.id != '' && owner = @request.auth.id",
      updateRule: "owner = @request.auth.id",
      deleteRule: "owner = @request.auth.id",
    });
    app.save(snapshots);
    const weekly = new Collection({
      name: "weekly_goals",
      type: "base",
      fields: [
        { name: "owner", type: "relation", required: true, maxSelect: 1,
          collectionId: app.findCollectionByNameOrId("users").id, cascadeDelete: true },
        { name: "week", type: "text", required: true },
        { name: "goals", type: "json", maxSize: 262144 },
        { name: "savedAt", type: "autodate", onCreate: true, onUpdate: true },
      ],
      indexes: ["CREATE UNIQUE INDEX idx_weekly_owner_week ON weekly_goals (owner, week)"],
      listRule: "owner = @request.auth.id",
      viewRule: "owner = @request.auth.id",
      createRule: "@request.auth.id != '' && owner = @request.auth.id",
      updateRule: "owner = @request.auth.id",
      deleteRule: "owner = @request.auth.id",
    });
    app.save(weekly);
  },
  (app) => {
    for (const name of ["snapshots", "weekly_goals"]) {
      try { app.delete(app.findCollectionByNameOrId(name)); } catch (e) {}
    }
  }
);
MIGRATION

# ---------- systemd service ----------
cat > /etc/systemd/system/pocketbase.service <<'UNIT'
[Unit]
Description=PocketBase (KONQR)
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/pocketbase
ExecStart=/opt/pocketbase/pocketbase serve --http=127.0.0.1:8090
Restart=always
RestartSec=5
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable --now pocketbase

# ---------- Caddy (auto-HTTPS reverse proxy) ----------
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
apt-get update
apt-get install -y caddy
cat > /etc/caddy/Caddyfile <<CADDY
${DOMAIN} {
    reverse_proxy 127.0.0.1:8090
}
CADDY
systemctl restart caddy

# ---------- firewall ----------
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# ---------- nightly on-server backup (03:15, keeps 14 days) ----------
cat > /opt/pocketbase/backup.sh <<'BACKUP'
#!/bin/bash
set -e
TMP=$(mktemp -d)
sqlite3 /opt/pocketbase/pb_data/data.db ".backup '$TMP/data.db'"
[ -f /opt/pocketbase/pb_data/auxiliary.db ] && sqlite3 /opt/pocketbase/pb_data/auxiliary.db ".backup '$TMP/auxiliary.db'"
cp -r /opt/pocketbase/pb_migrations "$TMP/" 2>/dev/null || true
OUT="/opt/pocketbase/backups/konqr-$(date +%Y%m%d).zip"
cd "$TMP" && zip -qr "$OUT" .
rm -rf "$TMP"
find /opt/pocketbase/backups -name 'konqr-*.zip' -mtime +14 -delete
BACKUP
chmod +x /opt/pocketbase/backup.sh
apt-get install -y zip
echo "15 3 * * * root /opt/pocketbase/backup.sh" > /etc/cron.d/konqr-backup

echo "KONQR server setup complete for ${DOMAIN}"
