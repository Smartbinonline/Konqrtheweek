# KONQR — Complete Project Handover Brief

## How to use this document
Paste this entire document into a new Claude conversation to transfer full project context. Attach the JSX files and logo files alongside it.

---

## 1. Project Overview

**KONQR** (pronounced "conquer") is a Franklin Covey-inspired goal achievement and weekly planning web app. It connects long-term life vision (10-year goals) to weekly AI-scheduled actions across multiple life domains. The name was chosen after extensive competitive analysis — no competitor occupies the "Vision + AI + Execution" space.

**Tagline:** "Konqr your week. Command your life."
**Positioning:** "Other apps manage your schedule. KONQR conquers your goals."

**Creator:** Ian, based in New Zealand. Runs multiple ventures across property (Crawley Design), investments, Smart Bin (IoT product), vehicle projects, and personal development. Uses Pacific/Auckland timezone.

**Current state:** Functional React prototype (JSX artifact) with all core features working. Next phase is building a proper web app with database.

---

## 2. Source Files

### Uploaded data files (used to generate seed data):
- `Task_List.xlsx` — 25 tasks across 7 activity groups with priorities 1-4
- `Weekly_Planner_Template.xlsx` — Two weekly calendar sheets showing Ian's existing spreadsheet workflow
- `Winners_2026.pptx` — Mission statement, yearly goals, year timing plan

### Built files:
- `weekly_planner.jsx` — Main app, ~950 lines, React JSX artifact, storage keys `v12-`
- `vision_builder.jsx` — Free Vision Builder funnel tool, ~330 lines, React JSX artifact
- `konqr_logo_light.svg` — Vector logo, dark text on transparent
- `konqr_logo_dark.svg` — Vector logo, white text on transparent
- `konqr_logo_light.pdf` — PDF vector logo (light version)
- `konqr_logo_dark.pdf` — PDF vector logo (dark version)
- `Split_Mark.png` — Original Gamma-generated logo (4 variants)

---

## 3. Critical Technical Constraints (Artifact Runtime)

These are hard-won lessons from many rebuild cycles. **Must follow all of these:**

1. **No default React import** — `import React from "react"` conflicts with the runtime's own React instance, causing `_react2 is not defined` error. Only import hooks: `import { useState, useEffect, useCallback, useMemo } from "react"`
2. **No arrow functions** — Use `function(){}` expressions only. Arrow functions cause parse errors in some artifact runtimes.
3. **No bare `<>` fragments** — Use `<div style={{display:"contents"}}>` wrapper divs with keys instead.
4. **No optional chaining on numeric literals** — e.g., `task.completed?.55` gets parsed incorrectly. Use `0.55` as a separate value.
5. **Variable/function name collisions** — If you have `var SM = ...` and `function SM(){}`, JSX interprets `<SM>` as the variable, not the function. Use unique names.
6. **Increment storage key prefix** when schema changes to force fresh seed data (currently `v12-`).
7. **No `localStorage` or `sessionStorage`** — Use `window.storage` API (get/set/delete/list) which is the artifact persistent storage.

---

## 4. App Architecture & Features

### 4.1 Core Views (7 total)

| View | Description |
|------|-------------|
| **Vision** (Mission & Goals) | Editable mission statement, numbered yearly goals |
| **Activity Groups** | 9 colour-coded groups with progress bars, shade palette preview |
| **Task List** | Filter (all/active/parked/completed), sort by priority, + New button |
| **Priority Matrix** | 4-quadrant Covey layout (P1-P4) with task counts |
| **Appointments** | Fixed-time blockers with multi-day support, colour picker |
| **Schedule Preferences** | Time blocks, max continuous hours, work days, timezone selector |
| **Weekly Calendar** | 7-day view 06:00-21:00 in 30-min slots, drag-and-drop |

### 4.2 Calendar Features
- Drag-and-drop task placement with touch support
- Meals (Breakfast 7:30, Lunch 12:30, Dinner 18:00) as visual blockers
- Appointment blocks with clash detection
- **Recurring tasks auto-populate** across applicable days when placed manually (daily = all 7 days, weekdays = Mon-Fri)
- **Auto Schedule** — preserves manual placements, fills gaps using preferences, skips past days using timezone
- **Clear Calendar** — wipes calendar AND reassembles sub-tasks back into parents
- **Undo** — 20-level stack, snapshots before every placement and auto-schedule
- Week navigation (prev/next/today), today highlighted with green border
- Mobile responsive — single-day swipeable view

### 4.3 Task System
- Priority 1-4 with colour coding (red P1, amber P2, blue P3, grey P4)
- Priority colour shows as full border frame around task
- Recurring options: none, daily, weekdays, weekly, monthly
- **Max 4h rule** — tasks over 4h trigger sub-task naming modal
- **Sub-task naming modal** — user names each sub-task, adjustable hours per part, add/remove rows (min 2)
- **Sub-tasks share same background shade** (linked via parentId in taskIndexMap)
- Group colour shows as left stripe accent

### 4.4 Parking Lot (Status System)
- **Active** (green ●) — schedulable, appears in unscheduled panel
- **Blocked** (red ⛔) — can't do yet, with reason field (e.g., "Need to go to Hong Kong")
- **Deferred** (amber ⏸) — choosing not to do this week
- **Reminder** (purple 🔔) — future visibility only
- Parked tasks shown in collapsible section below unscheduled panel on calendar
- Task list has "parked" filter tab
- Auto-schedule ignores non-active tasks

### 4.5 Colour System
- Each activity group has a base colour (hex)
- `taskShade()` function generates unique HSL shade per task (lightness 88-94%, hue shift ±10°)
- Sub-tasks sharing `parentId` get identical shade index via `taskIndexMap`
- Priority colour as border frame (full border)
- Group colour as left stripe accent
- Groups view shows 4 sample shade swatches
- Completed tasks: grey background, line-through, 0.55 opacity

### 4.6 Data Management
- Persistent storage via `window.storage` API (get/set with JSON stringify)
- **Export** — downloads all data as JSON file
- **Import** — file picker loads JSON, restores all state
- **Reset** — restores seed data
- **Timezone** setting in preferences (default Pacific/Auckland) with live time display

---

## 5. Seed Data

### 9 Activity Groups:
| ID | Name | Colour |
|----|------|--------|
| g1 | Crawley Design | #6366F1 (indigo) |
| g2 | Ian Wellbeing | #EC4899 (pink) |
| g3 | Smart Bin | #10B981 (green) |
| g4 | Marama Sale | #F97316 (orange) |
| g5 | Investments | #0EA5E9 (sky blue) |
| g6 | Tiger | #EAB308 (yellow) |
| g7 | Vehicles/Boats | #8B5CF6 (purple) |
| g8 | Development | #14B8A6 (teal) |
| g9 | Fun | #F43F5E (rose) |

### 25 Tasks (from spreadsheet):
Key ones with special settings:
- "Close Hang Seng Account" — pre-set as `status: "blocked"`, description: "Need to go to Hong Kong"
- "Tai Chai" — pre-set as `recurring: "daily"`
- "RFID" — set to 8h (triggers sub-task creation when edited)

### 8 Yearly Goals (from PowerPoint):
1. Sell Marama $1,400,000
2. Investments return 25%
3. SmartBin $1,000,000 sales
4. Travel
5. Cashflow to pay for life
6. Fun
7. Leverage AI & Software Products
8. Get off Job Seeker

### Mission Statement (from PowerPoint):
"Ians Advancement - Power of choices from profit. Financially Independent through Passive Income. Choices to Retire. Transfer effort to own software products (High Margin, no capital). More money in Investing. Cheap place to live in NZ with Income. Spend winters offshore."

### Schedule Preferences:
- Sharpen the Saw: 06:00-07:30 (any priority)
- Deep Work: 08:00-12:30 (P1/P2)
- General Work: 13:00-17:00 (P2/P3)
- Admin & Light: 17:00-18:00 (P4)
- Evening: 18:30-21:00 (P3)
- Max continuous: 2.5h
- Work days: Mon-Sat
- Timezone: Pacific/Auckland

---

## 6. Branding & Naming

### App Name: KONQR
- Logo: Double chevron arrow mark + "KONQR BOOKS" in Montserrat Black
- Created in Gamma.com, converted to SVG/PDF vectors
- Ian prefers the bottom two logo variants from Split_Mark.png (smaller, cleaner)
- Ian uses Xara for design work — SVG files are compatible

### Feature Renaming (Conquer Theme):
| Current | KONQR Name |
|---------|------------|
| Mission & Goals | **Vision** |
| Tasks | **Arrows** |
| Priority View | **Compass** |
| Calendar | **Battleground** |
| Parking Lot | **Harbour** |
| Preferences | **Armoury** |
| Sharpen the Saw | **Dawn Prep** |
| Deep Work | **Strike Zone** |
| General Work | **Campaign** |
| Admin | **Regroup** |
| Evening | **Night Watch** |
| Auto Schedule | **Deploy** |
| Undo | **Retreat** |
| Clear | **Regroup** |

*Note: Ian was concerned the military theme might be too aggressive for quality-of-life seekers. Conclusion: KONQR name works because it's abstract enough. Brand personality should be "ambitious without being aggressive" — personal mastery, not combat. The paying audience (entrepreneurs, investors, builders) responds to achievement language.*

---

## 7. KONQR's 7 Codes (replacing Covey's 7 Habits)

| # | Covey Original | KONQR Code | Principle |
|---|---------------|------------|-----------|
| 1 | Be Proactive | **Own the Field** | You are the general, not a spectator. Design your life. |
| 2 | Begin with End in Mind | **Set the Horizon** | Your 10-year vision is the horizon. Every week steps toward it. |
| 3 | Put First Things First | **Load the Arrows** | Choose which arrows to fire this week. Not everything is worth your aim. |
| 4 | Think Win-Win | **Forge Alliances** | No conquest happens alone. Build partnerships that multiply strength. |
| 5 | Seek to Understand | **Read the Terrain** | Before you act, understand. Study the landscape. Listen. |
| 6 | Synergise | **Multiply Force** | Leverage people, tools, and AI to amplify impact. |
| 7 | Sharpen the Saw | **Fortify the Base** | Your body, mind, and energy are the foundation. Renew daily. |

---

## 8. Competitive Analysis

### Franklin Covey today:
- Sold paper planner business in 2008
- Now a $287M corporate leadership consulting company (NYSE: FC)
- Launched AI Coach for enterprise training
- **No digital personal planner app exists** — the gap is filled by third-party PDFs ($15-30)

### Competitor Map (Schedule vs Vision axis, Manual vs AI axis):
- **Motion** ($19-34/mo) — AI auto-scheduling, no goals layer
- **Sunsama** ($20/mo) — mindful daily planning ritual, no yearly goals. Ian likes their clean interface and drag-and-drop.
- **Reclaim AI** ($8-12/mo) — calendar defence, habit protection
- **Todoist/Asana/ClickUp** — task management, no life design
- **Focality/Strides** — goal tracking, weak calendar execution
- **Key2Success** — Franklin Covey-inspired PDF planner

### KONQR's Gap:
Upper-right quadrant — **Vision + AI + Execution**. No competitor connects yearly life goals to AI-scheduled weekly actions across multiple life domains.

---

## 9. Free Funnel: Vision Builder

A free guided tool (vision_builder.jsx) that serves as top-of-funnel for KONQR. 7-step journey:

1. **Welcome** — sets tone, no account needed
2. **What Matters** — core values discovery + "What do you NOT want?" inversion exercise
3. **Life Domains** — choose 3-5 from 8 domains (Financial, Career, Health, Relationships, Growth, Adventure, Home, Legacy)
4. **Ideal Tuesday** — describe your ideal regular day (not a holiday)
5. **Time Horizons** — goals across 10yr / 5yr / 2yr / 1yr for each domain
6. **Mission Statement** — craft from all previous answers (shown for reference)
7. **Your Vision** — summary + export as text file + "Get KONQR" CTA

**Strategy:** Someone googles "how to find my purpose" → finds Vision Builder → spends 10-15 minutes → has genuine vision document → needs execution system → KONQR is the obvious next step.

### Full Funnel:
Search → Free Vision Builder + 7 Codes blog → Email course "Konqr your first goal in 30 days" → Free trial (14 days) → Paid subscriber

---

## 10. Research-Backed Power Features (PROPOSED, NOT YET BUILT)

1. **Sunday War Room** — guided weekly review ritual with goal scoring, AI momentum flags
2. **Vision → Arrow Chain** — every task links to a yearly goal, orphan detection, time-per-goal dashboard
3. **Conquest Tracker** — progress rings, weekly streaks, quarterly actual vs planned overlay
4. **Battle Buddy** — accountability partner sharing, auto-generated weekly progress reports
5. **Victory Log** — pre-set milestone rewards, achievement history wall
6. **AI Strategist** — pattern recognition ("40% deep work on Investments but 10% on SmartBin"), day-of-week performance analysis
7. **Identity Statements** — "I am..." anchored to goal domains, shown in morning brief

---

## 11. Keyword/Market Research

Cannot directly access Google Keyword Planner/Semrush/Ahrefs (require paid accounts).

### Estimated search volume tiers:
- **High volume (competitive):** "productivity app" 40-90K, "weekly planner" 60-100K, "habit tracker" 30-60K
- **Medium (goal-focused):** "goal setting app" 3-8K, "goal planner" 5-12K, "AI planner app" 2-6K
- **Low volume/high intent (KONQR sweet spot):** "Franklin Covey digital planner" 1-3K, "life design app" 200-800, "goal achievement system" 200-600

### Content strategy:
Win long-tail first → blog "how to achieve yearly goals" → comparison pages → App Store optimization "goal planner with AI scheduling"

---

## 12. Pending Work

### Immediate (prototype refinement):
- [ ] Implement KONQR branding rename throughout the app UI
- [ ] Build the 7 power features (War Room, Vision chain, Conquest tracker, etc.)
- [ ] Rename "Unscheduled" panel to **"Parking Lot"** on the calendar view
- [ ] **Inline task creation from calendar** — create new tasks without leaving the calendar window (+ button on calendar)
- [ ] **Inline appointment creation from calendar** — create appointments directly from the calendar view
- [ ] **Drag task to next/previous week** — dragging a task to the edge of the calendar window moves it to the corresponding adjacent week
- [ ] **Duplicate tasks** — ability to duplicate a task so you can break it up over the day around appointments or spread over the week
- [ ] **Drag to resize task duration** — drag the bottom edge of a task block on the calendar to extend or shrink its time allocation within calendar constraints

### Next phase (web app) — ARCHITECTURE DECIDED (July 2026):
**Stack (locked in after evaluating Flutter/MAUI/PWA and free-tier database risks):**
- **Frontend:** Web app / PWA (React), installable on Windows PC + 2 Android devices. NOT Flutter/MAUI — the prototype is already web tech and ports directly.
- **Backend:** PocketBase (single self-owned binary: SQLite DB + auth + realtime sync) on Ian's existing DigitalOcean account — $6/mo basic Droplet. Chosen over Supabase/free tiers because free hosted DBs pause on inactivity (e.g. during holidays); Ian requires an always-on database he owns.
- **Hosting:** Cloudflare Pages or GitHub Pages (free, no expiry). Ian's Vercel account is closing in a few months — do not build on it.
- **Backups:** nightly PocketBase data copy to Ian's OneDrive (versioned by OneDrive automatically).
- **Data model:** current-state only (tasks, groups, appts, prefs, mission, yearly goals, calendar placements) + weekly-goals rows keyed by week — the weekly rows double as progress-against-goals history. No other history retention wanted.

**Build phases (est. 4-6 working sessions total):**
- [x] Phase 1: DONE (29 Jul 2026) — clean React/Vite project in `app/`, installable PWA (manifest + service worker + icons), GitHub Actions auto-deploy to GitHub Pages (`.github/workflows/deploy.yml`). Ian's 10-min publish steps in `DEPLOY.md`. Smoke-tested headless: all 7 views, auto-schedule, task create, persistence, mobile layout — zero console errors. `src/logic.js` = engine ported unchanged; `src/App.jsx` generated from markup template via `scripts/transform.mjs`.
- [ ] Phase 2: PocketBase integration — Droplet setup script, auth, schema, replace storage layer with cloud sync, retire OneDrive file workflow — 2-3 sessions
- [ ] Phase 3: Polish + Android testing — 1 session
- [ ] Import from Vision Builder directly into KONQR account (later)

**Interim solution in current prototype:** Option 1 file-sync is built into KONQR_Planner.html — File System Access API binds to konqr-data.json in OneDrive (per-session reconnect; Android read/save-copy fallback). Known friction documented; superseded by Phase 2.

### Long-term:
- [ ] Voice input for task creation
- [ ] AI-assisted planning via API
- [ ] Mobile native apps (iOS/Android)
- [ ] Battle Buddy social features
- [ ] Actual keyword volume research using Semrush/Ahrefs

---

## 13. Key Decisions Made

1. **KONQR** chosen as app name (over STRIDE, HELM, FORGE, CADENCE, WAYPOINT, CONQUEST, ASCEND, REIGN, APEX)
2. Sub-tasks must be **named** (forces identification of specific activities)
3. Sub-tasks share **same colour shade** (visual linking)
4. Auto-schedule **preserves manual placements** (place key tasks first, then Deploy fills gaps)
5. **Parking Lot** with 4 statuses (active/blocked/deferred/reminder) rather than simple hide/show
6. **Free Vision Builder** as top-of-funnel strategy (Ian's insight: people struggle to define what they want)
7. Target audience: self-directed entrepreneurs, investors, multi-venture operators — not corporate teams
8. Brand tone: ambitious without being aggressive — personal mastery, not combat

---

## 14. EXECUTION MODE FOR NEXT SESSION (added at wrap-up)

Ian's instruction: execute the phases with MINIMAL demands on his time. Work autonomously; make sensible decisions without asking. Only involve Ian for things Claude cannot do:
1. Creating the $6/mo DigitalOcean Droplet (provide him a copy-paste cloud-init/setup script — Ubuntu 24, installs PocketBase + Caddy with auto-HTTPS + systemd service + nightly export cron)
2. HTTPS requirement: the PWA (served over HTTPS) cannot call an HTTP backend. Solution: a free DuckDNS subdomain (or a ~$10/yr domain if Ian prefers) pointed at the Droplet; Caddy handles certificates automatically. Prepare exact instructions for Ian to click through in 10 minutes.
3. One-time PocketBase admin account creation and app login on his 3 devices
4. Device testing feedback

Build order: Phase 1 (clean React project from konqr_app_logic.js + konqr_app_markup.html, deploy as installable PWA on Cloudflare Pages or GitHub Pages, still localStorage) → Phase 2 (PocketBase schema + auth + sync layer replacing localStorage/file-sync) → Phase 3 (Android polish).
Success criteria: Ian opens KONQR from an icon on PC/phone/tablet, logs in once per device, changes appear on other devices on open/refresh, nightly backup lands in OneDrive, zero recurring cost beyond the $6 Droplet.

---

*Document generated: July 2026*
*Storage key prefix: v12-*
*Files to attach: weekly_planner.jsx, vision_builder.jsx, Split_Mark.png, logo SVGs/PDFs*
