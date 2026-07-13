# Changelog

All notable changes to this project.

## Unreleased
- Navbar: switched affiliation link from Yale (YSE staff directory) to BU CDS Faculty (`bu.edu/cds-faculty`); added placeholder `icons/bu.svg` (swap in the official CDS logo when available).
- Added a `CHANGELOG.md` and a documentation-tracking convention for the project.

### Redesign — sticky frosted header + full-screen mobile panels (2026-07-12)
- Navbar is now a **fixed frosted-glass header** (`position: fixed`, `backdrop-filter: blur(26px)`, a `color-mix` 65% tint of the page background): it stays pinned while content scrolls under it and blurs/softens beneath it — near-invisible over the matching panel, a real frost over contrasting content (e.g. the plot).
- Each panel fills the viewport on mobile too: the hero uses `min-height: 100vh` (was compact on small screens), top-aligned so the command line sits high with clear space above the portrait; the plot panel already did.
- Mobile navbar slimmed to a single row (72px, 40px logo), with room reserved for the fixed theme toggle (previously it stacked and the toggle overlapped the Yale mark).

### Redesign — full-viewport terminal hero + two-panel layout (2026-07-12)
- Hero reworked into a **full-viewport "page 1"**: `.text-section` fills `100vh` (nav + hero) with the whoami content centered. The animated terminal command line is the focus, staggered diagonally (top-left) against a larger brain-cutout portrait (bottom-right) via a CSS-grid overlap so both stay large without colliding.
- Terminal prompt → `mitchell@horn` (host = surname); the duplicate "Mitchell Horn" was dropped from the navbar (logo only) so the identity appears once. Command line enlarged (`clamp(1.6rem, 2.3vw, 2.1rem)`), portrait `clamp(220px, 26vw, 320px)`. Below 900px the panel stacks and resets the overlap.
- **Two-panel palette**: cream hero (page 1) → white plot panel (page 2, `--surface`) → cream footer (returns to panel-1). Scrolling reveals the background change; fixed the page-background bleeding between the plot and footer (dropped the footer `margin-top`; the plot panel carries its own padding).
- CareerMap: dropped the gray era-band chart backdrop so the plot reads against the distinct panel background (`.cm-band` opacity → 0; reversible).
- **PWA icons regenerated** from `logo.svg` → `logo192.png` / `logo512.png` (the `{ HRF }` mark on cream, maskable safe-zone padding); `manifest.json` rewritten (real name/description, brand `theme_color`/`background_color`, `any maskable` purpose) and now linked from `index.html` (was orphaned); `theme-color` meta split light/dark.
- Cleanup: removed orphaned `--section-gap` / `--hero-gap` tokens and dead `.iframe-container` / `.text-container p` rules.

### Redesign — personal logo + earthy color system (2026-07-12)
- New self-built logo: a `{ HRF }` mark — the hemodynamic-response signal wrapped in data braces — in olive/wine/seafoam (`public/logo.svg`), live in the navbar with a full favicon set (`favicon.svg` / `favicon.ico` / `apple-touch-icon.png`). Retires the green-leaf `Logo1.png`.
- Color system: `--accent` is mode-adaptive — wine (`#8a3f5c`) in light, olive (`#b0b06a`) in dark, each the most legible on its ground; added `--accent-2` (seafoam) for hover / active. All three hues are drawn from the logo. The logo itself stays consistent across themes (a brand anchor).
- Career-map threads recolored to an earthy categorical palette (plum · sage · rust · seafoam · ochre) — distinct by hue, muted to match.
- Career-map polish: pinned node card now dismisses on outside-click / Escape; metric ledger regrouped so each value hugs its own label (publications → `12+`); title → "10+ years, 1 data story"; sub reworded, unwrapped, and emphasizing the two encoded axes (`when` · `skill`).
- Terminal prompt → `mitch@BU-CDS` (current affiliation).
- Perf: profile photo resized + converted to WebP (5.1 MB → 208 KB); removed the PNG.

### Redesign — homepage refinement: nav/footer restructure, leaner career map (2026-07-12)
- Navbar pared to identity + current affiliations (BU · Yale, right-justified); LinkedIn, GitHub, Publications, and Resources moved into the footer. Publications dropdown removed (now flat links); Navbar is a static component again.
- New `Footer` (`src/components/Footer.jsx` + `src/styles/Footer.css`): the page's link directory and an intentional bottom edge — identity, copyright, and the moved links (LinkedIn/GitHub icons, ORCID · Google Scholar · ResearchGate, Resources). Reuses the light/dark icon swap for GitHub.
- CareerMap trimmed to the single timeline view: removed the Skill × Era matrix + its toggle, the decorative `grep` prompt, and the thread counter; dropped the `// career map` eyebrow; tightened the heading ("10+ years, 1 data scientist") and sub; pared the metric ledger to three self-evident numbers (researchers trained · grants · publications).
- Removed `min-height: 100vh` from `.content`, which pushed the footer below the fold and left a void on tall screens.
- LinkedIn icon: cropped the trademark ® and squared the asset to match the other marks.

### Redesign — career map: self-built arc diagram replaces Flourish (2026-07-12)
- Replaced the third-party Flourish network-graph `<iframe>` in `Content.jsx` with a self-contained `CareerMap` (`src/components/CareerMap.jsx` + `src/styles/CareerMap.css`) — no external embeds, no new dependencies (vanilla React + inline SVG + CSS).
- **Timeline-anchored arc diagram** (the antidote to the force-directed hairball): role / project / publication / foundation nodes sit on a horizontal time spine (x = year, no physics); arcs above connect the 5 recurring skill threads that carry across eras — Python pipelines, ML segmentation→LLM/RAG, GPU/CUDA, imaging data, teaching/enablement. Hover or focus a role (or a thread chip) highlights its arcs + endpoints and fades the rest; a grep-style chip filter isolates a thread. Second tab: a Skill × Era contribution-graph matrix (sequential blue ramp) as a zoom-out.
- Thread palette taken from the validated dataviz categorical set and checked in both themes with `validate_palette.js` (floor-band CVD, mitigated by labelled chips + hover isolation + distinct per-thread arc tiers + a `forced-colors`/print dash fallback).
- Accessible: SVG geometry is `aria-hidden`; nodes are real focusable `<button>`s with full `aria-label`s; a visually-hidden ordered summary lists every role + thread; honors `prefers-reduced-motion`; responsive (spine scrolls horizontally under 680px via `overflow-x`).
- Content grounded in the CV: 750+ trained · 825+ papers · $3.1M+ grants · 12 publications · NAIRR · 7T MRI · 10–40× GPU speedups · 88% segmentation sensitivity.
- Reuses `tokens.css` + the shared monospace stack; light and dark both verified by screenshot.

### Redesign — Phase 1: Vite cutover + dead-code purge (2026-07-11)
- Migrated build tooling from Create React App (`react-scripts`) to **Vite 8** (`@vitejs/plugin-react` 6). Requires Node ≥20.19.
- Entry moved to root `index.html` + `src/main.jsx`; removed inert `HashRouter` (zero routes existed). Renamed JSX files `.js` → `.jsx` (Vite 8 Oxc transformer requirement).
- Removed dead dependencies: `react-router-dom`, `express`, `web-vitals`, `@testing-library/*`, `react-scripts` (~1,500 → 70 packages).
- Deleted dead code: `Publications.js` (data preserved to `src/data/publications.js`), `reportWebVitals.js`, `setupTests.js`, `src/tests/`, `src/logo.svg`, and the duplicate CSS reset in `App.css`.
- Deleted ~11.5 MB of unreferenced assets (`BigPicture1-3.png`, `Picture1.png`, `Logo2.png`, `survey_data.pptx`, `askci.svg`).
- Added `public/.nojekyll` and `vite.config.js` (`base: '/'` for the user Pages site); deploy now targets `dist`.
- Tests dropped during migration; a Vitest smoke test can be re-added later.
- Phases 2-5 (design system, IA rebuild, assets, deploy cutover) pending.

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
- De-buzzworded the intro statement: replaced the "senior research data analyst… AI-driven solutions" line with **"I build systems and AI infrastructure that help researchers across disciplines develop, apply, and push the boundaries of data-science methods."**
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
