import { StrictMode } from 'react'
import { createRoot } from 'react'
import './styles/design-system.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
