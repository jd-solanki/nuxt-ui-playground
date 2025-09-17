export function genCdnLink(pkg: string,
  version: string | undefined,
  path: string) {
  version = version ? `@${version}` : ''
  return `https://unpkg.com/${pkg}${version}${path}`
}
