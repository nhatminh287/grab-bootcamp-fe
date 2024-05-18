import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import '@smastrom/react-rating/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
