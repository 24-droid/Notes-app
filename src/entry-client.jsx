import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NotesProvider } from './context/NotesContext'
import App from './App'
import './index.css'

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <BrowserRouter>
      <NotesProvider>
        <App />
      </NotesProvider>
    </BrowserRouter>
  </StrictMode>
)
