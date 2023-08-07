/**
 * External dependencies
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

/**
 * Internal dependencies
 */
import '@/index.css'
import router from "@/router.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
