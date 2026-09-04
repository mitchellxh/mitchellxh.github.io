// Page assertions for the built index.html. No dependencies — run with plain node.
//
//   node scripts/test_page.mjs dist/index.html
//
// Runs against the BUILT page, not the source: dist/index.html is the file that
// actually deploys, and Vite rewrites the head on its way there.
//
// Wired into `predeploy`, so a broken or unreplaced Google tag blocks `npm run deploy`.

import { readFileSync } from 'node:fs';

// Google Analytics 4 measurement id for this site's own property.
// Must match the id embedded in index.html. Update both together.
const GA_ID = 'G-5J21NQ943K';
const GA_PLACEHOLDER = 'G-XXXXXXXXXX';

const file = process.argv[2] ?? 'dist/index.html';
const html = readFileSync(file, 'utf8');

const ok = (m) => console.log('ok   ' + m);
const bad = (m) => { console.log('FAIL ' + m); process.exitCode = 1; };
const has = (s, sub, m) => (s.includes(sub) ? ok(m) : bad(m));
const not = (s, sub, m) => (s.includes(sub) ? bad(m) : ok(m));
const eq = (got, want, m) =>
  got === want ? ok(m) : bad(`${m} (got ${JSON.stringify(got)}, want ${JSON.stringify(want)})`);
const count = (s, re) => (s.match(re) || []).length;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

console.log(`# ${file}`);

// --- Google tag -------------------------------------------------------------

eq(/^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== GA_PLACEHOLDER, true,
  `GA_ID is a real measurement id, not the ${GA_PLACEHOLDER} placeholder`);

eq(count(html, new RegExp(`<script async src="https://www\\.googletagmanager\\.com/gtag/js\\?id=${esc(GA_ID)}"></script>`, 'g')), 1,
  "one Google tag loader with this site's measurement id");

eq(count(html, new RegExp(`gtag\\("config","${esc(GA_ID)}"\\)`, 'g')), 1,
  'one gtag config call with the same id');

eq(count(html, /googletagmanager\.com/g), 1, 'no second Google tag');

has(html, 'function gtag(){window.dataLayer.push(arguments);}',
  'gtag() pushes through window.dataLayer');

not(html, '{dataLayer.push(arguments);}', 'no bare dataLayer reference');

// No other property's id leaked in. Asset URLs are excluded: Vite's content
// hashes use a base64url alphabet that can itself contain "G-".
const foreign = [...new Set(
  html.replace(/\/assets\/[^"']*/g, '').match(/G-[A-Z0-9]{6,}/g) || []
)].filter((id) => id !== GA_ID);
eq(foreign.join(','), '', 'no foreign measurement id present');

// --- Placement --------------------------------------------------------------

const gaAt = html.indexOf('googletagmanager.com/gtag/js');
const charsetAt = html.search(/<meta\s+charset=/i);
const headEndAt = html.indexOf('</head>');
gaAt > charsetAt && gaAt < headEndAt
  ? ok('Google tag sits in the head after the charset meta')
  : bad('Google tag is outside the head or ahead of the charset meta');

const themeGuardAt = html.indexOf("localStorage.getItem('theme')");
themeGuardAt === -1 || gaAt < themeGuardAt
  ? ok('Google tag precedes the theme-flash guard')
  : bad('Google tag runs after the theme-flash guard');

// --- Build hygiene ----------------------------------------------------------

not(html, '__GA_TAG__', 'Google tag placeholder resolved');
not(html, '%VITE_', 'no unreplaced Vite env placeholder');
