/** Entry point for the react-veil demo application. */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-veil/style.css';

import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
