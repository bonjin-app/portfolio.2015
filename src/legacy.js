import legacyDocument from './legacy-index.html?raw'

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

export function loadLegacyMarkup() {
  return prepareLegacyMarkup(legacyDocument)
}
