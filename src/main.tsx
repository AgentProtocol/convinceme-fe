import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import StarknetProvider from './contexts/StarknetProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StarknetProvider>
      <App />
    </StarknetProvider>
  </BrowserRouter>,
)
