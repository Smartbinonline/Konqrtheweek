# KONQR Cloud Sync — Server Go-Live (your ~15 minutes)

The app already has sync built in and tested. This turns on your own always-on
server: PocketBase + automatic HTTPS on a $6/mo DigitalOcean droplet.

## 1. Free domain name (DuckDNS, ~3 min)

1. Go to **duckdns.org** → sign in (Google/GitHub).
2. Add a subdomain, e.g. `konqr-ian` → you get **konqr-ian.duckdns.org**.
3. Leave the tab open — you'll paste the droplet's IP here in step 3.

## 2. Create the droplet (~5 min)

1. DigitalOcean → **Create → Droplets**.
2. Region: **Sydney** (closest to NZ). Image: **Ubuntu 24.04 LTS**.
3. Size: **Basic → Regular → $6/mo** (1 GB).
4. Authentication: password or SSH key — your choice (the setup needs neither).
5. Open **Advanced Options** → tick **Add Initialization scripts (free)**.
6. Open `setup-droplet.sh` (in this folder) in Notepad, change the one line
   `DOMAIN="your-name.duckdns.org"` to your real subdomain, then paste the
   whole file into the User data box.
7. Create the droplet. Copy its **public IP address**.

## 3. Point the domain at it (~1 min)

Back in the DuckDNS tab: paste the droplet IP into your subdomain's
"current ip" box → **update ip**.

The droplet finishes installing in ~2-3 minutes. Caddy fetches the HTTPS
certificate automatically once the domain resolves (it retries by itself, no
action needed).

## 4. Create your accounts (~3 min)

1. Open `https://YOUR-SUBDOMAIN.duckdns.org/_/` — PocketBase asks you to
   create the **admin** account. Use your email + a strong password.
   (Save this password — the backup script uses it too.)
2. In the admin dashboard: **Collections → users → + New record** — enter your
   email and a password. This is your **app login** (can be a different
   password than admin).

## 5. Sign in on your devices (~2 min)

On each device (PC, both Androids), open the KONQR app → click **○ Sign in**
(top right) → enter:
- Server URL: `https://YOUR-SUBDOMAIN.duckdns.org`
- The email + password from step 4.2 (the *users* record, not admin)

Done. The pill turns green **● Synced**. Changes save automatically and other
devices pick them up when opened or refreshed (or via the pill = sync now).

## 6. Nightly backup to OneDrive (~3 min, on your PC)

The droplet already keeps its own 14-day rolling backups. To also land a copy
in OneDrive (with OneDrive's automatic version history), register the fetch
script as a daily task — PowerShell (edit the 3 values):

```powershell
schtasks /Create /TN "KONQR Backup" /SC DAILY /ST 21:00 /TR "powershell -NoProfile -ExecutionPolicy Bypass -File \"C:\Users\IanCrawley\Documents\GitHub\Konqrtheweek\app\server\Fetch-KonqrBackup.ps1\" -Server https://YOUR-SUBDOMAIN.duckdns.org -Email YOUR-ADMIN-EMAIL -Password YOUR-ADMIN-PASSWORD"
```

It saves to `OneDrive\KONQR-Backups\konqr-data.zip` (fixed name, so OneDrive
versions it). Runs at 9pm; skipped days don't matter — the droplet still has
its own backups.

## Troubleshooting

- **Sign-in says "Cannot reach server"**: the domain isn't resolving yet or
  Caddy is still getting its certificate — wait 2 minutes and retry.
- **Check the server**: `https://YOUR-SUBDOMAIN.duckdns.org/api/health` should
  say "API is healthy".
- **Setup log** (if you SSH in): `/var/log/konqr-setup.log`.
- **Restore a backup**: PocketBase admin → Settings → Backups → upload/restore.
