import { useEffect, useState } from 'react'

const legacyScripts = [
  '/legacy/js/jquery-1.11.3.min.js',
  '/legacy/js/jquery.scrollTo-min.js',
  '/legacy/js/jquery.magnific-popup.min.js',
  '/legacy/js/script.js',
]

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.dataset.legacyPortfolio = 'true'
    script.onload = resolve
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.body.appendChild(script)
  })
}

export default function App({ initialMarkup = '', initialError = '' }) {
  const [markup] = useState(initialMarkup)
  const [error, setError] = useState(initialError)

  useEffect(() => {
    if (!markup || window.__portfolio2015ScriptsLoaded) return

    window.__portfolio2015ScriptsLoaded = true
    legacyScripts.reduce(
      (promise, src) => promise.then(() => loadScript(src)),
      Promise.resolve(),
    ).catch((scriptError) => {
      window.__portfolio2015ScriptsLoaded = false
      setError(scriptError.message)
    })
  }, [markup])

  if (error) {
    return (
      <main className="grid min-h-screen place-content-center bg-portfolio-ink text-center text-white">
        <h1 className="m-0 font-sans text-[2rem]">PORTFOLIO</h1>
        <p className="font-sans text-sm text-[#aaa]">{error}</p>
      </main>
    )
  }

  if (!markup) {
    return (
      <main
        className="h-screen w-full bg-portfolio-ink"
        aria-busy="true"
        aria-label="포트폴리오 불러오는 중"
      />
    )
  }

  return (
    <div
      className="h-full min-h-full"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
