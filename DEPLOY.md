# KONQR — Going Live (your ~10 minutes)

Everything is built and tested. The repo is ready to publish; the GitHub Action
does the rest automatically on every push.

## Step 0 — move one file (security-restricted, I couldn't place it directly)

Open PowerShell and paste this one line:

```powershell
cd $HOME\Documents\GitHub\Konqrtheweek; mkdir .github\workflows -Force | Out-Null; Move-Item deploy-workflow.yml .github\workflows\deploy.yml -Force
```

(Or by hand: create a `.github\workflows` folder and move `deploy-workflow.yml`
into it, renamed to `deploy.yml`.)

## One-time: publish to GitHub Pages

1. Open **GitHub Desktop** → File → **Add local repository** → choose
   `Documents\GitHub\Konqrtheweek`. It will say it isn't a repository yet —
   click **create a repository here instead** → Create Repository.
2. Click **Publish repository**. Untick "Keep this code private"
   (GitHub Pages is free on **public** repos only). Publish.
3. On github.com open the repo → **Settings → Pages** → under "Build and
   deployment" set **Source: GitHub Actions**. If a run didn't start
   automatically: **Actions** tab → "Deploy KONQR PWA" → **Run workflow**.
4. ~1 minute later your app is live at:
   `https://<your-username>.github.io/Konqrtheweek/`

## Install on your devices

- **Windows (Edge/Chrome):** open the URL → click the small install icon at the
  right end of the address bar → Install. KONQR gets its own window + Start menu icon.
- **Android (Chrome):** open the URL → ⋮ menu → **Add to Home screen** →
  **Install**.

## From now on

Any change committed + pushed (GitHub Desktop: Commit → Push) redeploys
automatically. The app updates on next refresh.

## Notes

- Phase 1 = localStorage per device (no sync between devices yet). Your
  existing "Data file" OneDrive sync button still works as the interim bridge.
- Phase 2 (PocketBase on your DigitalOcean droplet) replaces that with real
  cloud sync — droplet setup script comes with that phase.
- If you'd rather keep the repo private: free option is Cloudflare Pages —
  connect the repo there, set build command `npm run build`, build output
  `app/dist`, root directory `app`. Same result.
