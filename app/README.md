# KONQR Weekly Planner — Web App (Phase 1)

React + Vite PWA port of the KONQR prototype. Data is stored in the browser's
localStorage (per device) — Phase 2 replaces this with PocketBase cloud sync.

## Structure

- `src/logic.js` — the planner engine, ported unchanged from `konqr_app_logic.js`
  (a React class component: state, scheduling, drag-drop, undo, storage).
- `src/App.jsx` — the UI, generated from `konqr_app_markup.html` by
  `scripts/transform.mjs`. Edit directly, or edit the template and rerun
  `npm run transform`.
- `src/css.js` — tiny helper that turns inline CSS strings into React style objects.
- `public/` — PWA manifest, service worker (`sw.js`), app icons.
- `scripts/icons.mjs` — regenerates PNG icons from `public/icon.svg`
  (needs `npm i -D sharp` first).

## Commands

```
npm install     # once
npm run dev     # local dev server
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## Notes

- `base: "./"` in `vite.config.js` keeps the build relocatable (GitHub Pages
  project path, Cloudflare Pages, anywhere).
- The service worker is network-first for the app shell, cache-first for hashed
  assets — updates land on refresh, and the app still opens offline.
- localStorage keys use the `konqr_v13-` prefix, same as the prototype.
