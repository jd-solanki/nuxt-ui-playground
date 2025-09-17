import { nuxtUIColorTokens } from '../utils/colors';

export const mainTS = `
// tailwind CDN import
const twSrc = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'
const twScriptTag = document.createElement('script')
twScriptTag.setAttribute('src', twSrc)
document.head.appendChild(twScriptTag)

const twStyleTag = document.createElement('style')
twStyleTag.setAttribute('type', 'text/tailwindcss')
console.log(twStyleTag.getAttribute('innerHTML'))

twStyleTag.innerHTML = \`
  @theme {
${Object.keys(nuxtUIColorTokens).map(token => `--color-${token}: var(--ui-${token});`).join('\n  ')}
  }
    \`;
document.head.appendChild(twStyleTag)
`.trim()
