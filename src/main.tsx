import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StarknetProvider from './contexts/StarknetProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StarknetProvider>
      <App />
    </StarknetProvider>
  </StrictMode>,
)
