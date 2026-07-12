# Changelog

All notable changes to this project.

## Unreleased
- Navbar: switched affiliation link from Yale (YSE staff directory) to BU CDS Faculty (`bu.edu/cds-faculty`); added placeholder `icons/bu.svg` (swap in the official CDS logo when available).
- Added doc-tracking infrastructure: `NOTES.md` (doc-map), `CHANGELOG.md`, and `a docs convention`.

### Redesign — Phase 1: Vite cutover + dead-code purge (2026-07-11)
- Migrated build tooling from Create React App (`react-scripts`) to **Vite 8** (`@vitejs/plugin-react` 6). Requires Node ≥20.19.
- Entry moved to root `index.html` + `src/main.jsx`; removed inert `HashRouter` (zero routes existed). Renamed JSX files `.js` → `.jsx` (Vite 8 Oxc transformer requirement).
- Removed dead dependencies: `react-router-dom`, `express`, `web-vitals`, `@testing-library/*`, `react-scripts` (~1,500 → 70 packages).
- Deleted dead code: `Publications.js` (data preserved to `src/data/publications.js`), `reportWebVitals.js`, `setupTests.js`, `src/tests/`, `src/logo.svg`, and the duplicate CSS reset in `App.css`.
- Deleted ~11.5 MB of unreferenced assets (`BigPicture1-3.png`, `Picture1.png`, `Logo2.png`, `survey_data.pptx`, `askci.svg`).
- Added `public/.nojekyll` and `vite.config.js` (`base: '/'` for the user Pages site); deploy now targets `dist`.
- Tests dropped during migration; a Vitest smoke test can be re-added later.
- Full phased plan: `the redesign plan`. Phases 2-5 (design system, IA rebuild, assets, deploy cutover) pending.

### Redesign — Phase 2: Design-system foundation (2026-07-11)
- Added `src/styles/tokens.css`: color/type/spacing tokens with a single accent (`#0066cc`); removed the green gradient name-hover.
- Dark mode: `prefers-color-scheme` default + explicit `data-theme` override persisted to `localStorage`, with a pre-paint inline script in `index.html` to prevent theme-flash.
- Added accessible `ThemeToggle` (`aria-pressed`, visually-hidden label) mounted in `App.jsx`.
- Added `:focus-visible` focus rings (WCAG 1.4.11) and a `prefers-reduced-motion` safety net.
- Tokenized `Navbar.css` / `Content.css` colors so both light and dark themes render coherently.

### Redesign — navbar social links (2026-07-11)
- Dropped the X/Twitter link and re-added Yale (YSE) at the end next to BU. Order is now AskCI · LinkedIn · GitHub · BU · Yale (GitHub centered). Removed orphaned `icons/x.png` and the dead `twitter` CSS selector.

### Redesign — real BU, Yale & GitHub logos (2026-07-11)
- BU: official mark squared from the CDS signature TIFF — cropped inside the keyline, padded to a solid `#E3314A` tile, with a thin, subtle white keyline border re-drawn → `icons/bu.png` (128²).
- Yale: navy square mark from the supplied icon set → `icons/yale.png` (128²). Removed old `yse.png`.
- GitHub: light/dark variants (`gh.png` black, `gh-dark.png` white) with a CSS `<img>` swap (`.social-icon--light` / `--dark`) keyed to both `prefers-color-scheme` and the manual `data-theme` toggle. Removed the old invert-filter hack.
- BU, Yale, GitHub all legible in light and dark.
- Removed the legacy `opacity: 0.85` + brightness/contrast filter from `.social-icon` — brand tiles (LinkedIn, BU, Yale) now render at true color, identical in both themes (a semi-transparent tile was blending with the navbar background).
- Fixed the LinkedIn "in": LinkedIn's official In-Bug ships the "in" as a *transparent knockout* (it takes the background color — white on light, black on dark), unlike BU/Yale's opaque white letters. Flood-filled the enclosed transparent pixels with opaque white so the "in" is constant white on both themes. Added a `color-scheme: light dark` meta so browsers respect the site's own dark mode.

### Redesign — dropped ask.CI; LinkedIn kept (2026-07-11)
- Removed the ask.CI link, icon (`askci.png`), and its 78px sizing CSS — vestigial. Social row is now LinkedIn · GitHub · BU · Yale.
- LinkedIn: kept the existing official blue "in" bug (the downloaded `LI-In-Bug` is visually identical).
- Only remaining dark-mode item: the green nav mark still half-blends on dark.

### Redesign — bio / statement (2026-07-11)
- Applied the de-buzzworded statement drafted in the 2026-07-07 planning mockup (`a mockup`): replaced the "senior research data analyst… AI-driven solutions" line with **"I build systems and AI infrastructure that help researchers across disciplines develop, apply, and push the boundaries of data-science methods."**
- Kept it to the statement only — no separate title/affiliation label (matches the original site: affiliation is conveyed by the BU/Yale nav links, not repeated as text).
- Removed the empty `<header>` placeholder from `Content.jsx`.

### Redesign — terminal bio, authentic session (2026-07-11)
- Replaced the static statement with a `TerminalBio` component: an authentic shell session — the cursor TYPES a command, then output prints INSTANTLY (not the reverse), cycling commands to reveal each role facet. Blinking rectangular block cursor on the command line. Vanilla React, no dependency.
- Layout-stable: fixed-width block (sized to the longest line) + reserved output-line height, so nothing re-centers or jumps as content changes (fixes the earlier jitter).
- Accessible: `prefers-reduced-motion` shows one static command+output; screen readers + SEO get the role list via visually-hidden text (`aria-hidden` on the animation).
- Command/output pairs are a starter set in `TerminalBio.jsx` (`ENTRIES`) — easy to edit.

### Redesign — dark-mode graphics approach (2026-07-11)
- Decision: dark-mode logo legibility will be handled by dedicated **user-supplied dark-variant logos**, not CSS chips/backgrounds. An interim `--icon-chip` experiment was tried and reverted.
- The interactive (Flourish) embed is slated for a full overhaul, so its dark treatment is deferred — no media card for now.
- Removed the now-unused `--icon-chip` and `--media-surface` tokens. A light/dark `<img>` swap (keyed to theme) will be wired when the dark logos arrive.
- Profile image left uncarded (transparent PNG sits correctly on any theme). Follow-up (Phase 4): `prof-1-brain.png` is 5.2 MB with baked-in empty space — needs re-export.
