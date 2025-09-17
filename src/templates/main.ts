import { nuxtUIColorTokens } from '../utils/colors';

// Precompute theme block so runtime code stays minimal
const themeLines = Object.keys(nuxtUIColorTokens)
  .map(token => `    --color-${token}: var(--ui-${token});`)
  .join('\n');

// Build the final CSS block once (host-side) and embed as a plain string in the REPL code
const CSS = `@theme {\n${themeLines}\n}`;

export const mainTS = `
// Idempotent Tailwind + theme injector (re-runs on every edit in the REPL)
;(function ensureTailwindTheme(){
  const SCRIPT_ID = 'tw-cdn-script';
  const STYLE_ID = 'tw-theme-style';
  const twSrc = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4';

  // Inject Tailwind runtime script once
  if (!document.getElementById(SCRIPT_ID)) {
    const s = document.createElement('script');
    s.id = SCRIPT_ID;
    s.src = twSrc;
    document.head.appendChild(s);
  }

  const desiredCSS = ${JSON.stringify(CSS)};

  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.type = 'text/tailwindcss';
    styleEl.innerHTML = desiredCSS;
    document.head.appendChild(styleEl);
  } else if (styleEl.innerHTML !== desiredCSS) {
    // Update only if tokens changed
    styleEl.innerHTML = desiredCSS;
  }
})();
`.trim();
