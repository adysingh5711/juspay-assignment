import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'leaflet/dist/leaflet.css';

/**
 * Application Entry Point
 * 
 * This is the main entry point for the React application. I've structured this
 * to follow Vite best practices with proper imports and React 18's createRoot API.
 */

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
); 