import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AuthInitializer from './components/AuthInitializer'
import CompleteProfileModal from './components/CompleteProfileModal'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthInitializer>
        <App />
        <CompleteProfileModal />
      </AuthInitializer>
    </BrowserRouter>
  </StrictMode>,
)
