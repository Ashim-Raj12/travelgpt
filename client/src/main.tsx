import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

// Intercept all fetch requests to automatically attach the Bearer token
const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const token = localStorage.getItem("travelgpt_token");
  if (token) {
    init = init || {};
    // Safely handle Headers object or plain object
    let newHeaders = new Headers(init.headers || {});
    newHeaders.set("Authorization", `Bearer ${token}`);
    init.headers = newHeaders;
  }
  return originalFetch(input, init);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
