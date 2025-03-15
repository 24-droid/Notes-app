import React, { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { NotesProvider } from './context/NotesContext'
import App from './App'

/**
 * @param {string} url
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(url, options) {
  return renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <NotesProvider>
          <App />
        </NotesProvider>
      </StaticRouter>
    </StrictMode>,
    options
  )
}
