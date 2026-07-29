import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import App from './App.jsx'
import { loadLegacyMarkup } from './legacy.js'
import './tailwind.css'

let initialMarkup = ''
let initialError = ''

try {
  initialMarkup = await loadLegacyMarkup()
} catch (error) {
  initialError =
    error instanceof Error ? error.message : '포트폴리오를 불러오지 못했습니다.'
}

const root = createRoot(document.getElementById('root'))

flushSync(() => {
  root.render(
    <App initialMarkup={initialMarkup} initialError={initialError} />,
  )
})
