/**
 * External dependencies
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Internal dependencies
 */
import '@/index.css'
import App from "@/App.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        retry: false,
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </StyledEngineProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
