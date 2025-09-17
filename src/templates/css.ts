import { generateColor, generateShades, nuxtUIColorTokens } from '../utils/colors';
import { genCdnLink } from '../utils/network';

export const mainCSS = `
@import '${genCdnLink('@nuxt/ui', '4.0.0-alpha.2', '/dist/runtime/index.css')}';

/* Nuxt UI */
@layer base {
  :root {
    ${Object.entries(nuxtUIColorTokens).map(([key, value]: [string, string]) => generateShades(key, value)).join('\n  ')}
  }
  :root, .light {
    ${Object.keys(nuxtUIColorTokens).map(key => generateColor(key, 500)).join('\n  ')}
  }
  .dark {
    ${Object.keys(nuxtUIColorTokens).map(key => generateColor(key, 400)).join('\n  ')}
  }
}
`.trim()
