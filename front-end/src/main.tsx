import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import App from './App.tsx'
import './index.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
