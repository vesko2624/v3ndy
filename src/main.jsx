/**
 * External dependencies
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";

/**
 * Internal dependencies
 */
import '@/index.css'
import App from "@/App.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </StyledEngineProvider>
  </React.StrictMode>,
)
