import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './legacy-bridge.css'

createRoot(document.getElementById('root')).render(<App />)
