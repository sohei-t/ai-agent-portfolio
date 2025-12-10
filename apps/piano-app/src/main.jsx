/**
 * Main Entry Point
 * Renders the React application
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import './styles/global.css';
import './styles/themes.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
