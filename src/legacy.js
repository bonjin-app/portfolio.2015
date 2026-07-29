function prefixLegacyPath(value) {
  if (
    !value ||
    value.startsWith('#') ||
    value.startsWith('/') ||
    value.startsWith('http:') ||
    value.startsWith('https:') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('data:')
  ) {
    return value
  }

  return `/legacy/${value}`
}

export function prepareLegacyMarkup(html) {
  const documentFragment = new DOMParser().parseFromString(html, 'text/html')

  documentFragment.querySelectorAll('[src]').forEach((element) => {
    element.setAttribute('src', prefixLegacyPath(element.getAttribute('src')))
  })

  documentFragment.querySelectorAll('[href]').forEach((element) => {
    element.setAttribute('href', prefixLegacyPath(element.getAttribute('href')))
  })

  return documentFragment.body.innerHTML
}

export async function loadLegacyMarkup() {
  const response = await fetch('/legacy/index.html')

  if (!response.ok) {
    throw new Error(`Legacy portfolio returned ${response.status}`)
  }

  return prepareLegacyMarkup(await response.text())
}
