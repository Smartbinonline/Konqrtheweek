# KONQR Cloud Sync — Cloudflare Worker setup (once, ~10 minutes, $0/month)

This gives every device — workstation, laptop, phone — one live master copy of
your planner data. The app keeps working offline; this replaces the data FILE,
not the app.

Your generated token (change a few characters if you like, but then use the
same everywhere):

    KONQR_hFRUjIRAjBpZKbzh7rZmWeXC_M_4YISp

## Steps (dash.cloudflare.com — same account as your car/parts sites)

1. **Create the KV store**
   Left menu: **Storage & Databases → KV** → *Create a namespace* →
   name it `KONQR_DATA` → Create.

2. **Create the Worker**
   Left menu: **Workers & Pages** → *Create* → **Worker** →
   name it `konqr-sync` → Deploy the hello-world it offers →
   then click **Edit code**, delete everything, paste the whole contents of
   `cloudflare-worker.js` (next to this file) → **Deploy**.

3. **Connect the KV store to the Worker**
   Worker `konqr-sync` → **Settings → Bindings** → *Add* → **KV namespace** →
   Variable name: `KONQR_KV`  → Namespace: `KONQR_DATA` → Save.

4. **Set the secret token**
   Worker `konqr-sync` → **Settings → Variables and Secrets** → *Add* →
   Type: **Secret** → Name: `KONQR_TOKEN` → Value: the token above → Save.
   (After adding a binding/secret, hit **Deploy** again if it asks.)

5. **Note your Worker address** — shown on the Worker's overview page, like:

       https://konqr-sync.<your-account>.workers.dev

## Test it (PowerShell on your PC)

    Invoke-RestMethod -Uri "https://konqr-sync.<your-account>.workers.dev" `
      -Headers @{ Authorization = "Bearer KONQR_hFRUjIRAjBpZKbzh7rZmWeXC_M_4YISp" }

Expected first reply:  `version: 0, savedAt: , snapshot: `
(an empty store — that's success). Without the header you should get
`unauthorized` — also success: the lock works.

## Then

Send Claude the Worker address. The app gets a Cloud Sync card in Preferences:
paste the address + token once per device, and from then on every device pulls
on open/focus and every ~45 s, pushes a few seconds after you stop editing,
and merges per-item so phone edits and workstation edits don't fight.
Daily backups are kept in KV for 45 days; your Export button still works.

Free-tier headroom: KV allows 1,000 writes/day — heavy planner use is well
under 300. Nothing to maintain, nothing sleeping, no server.
