import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.jsx';
import './styles/tailwind.css'; 
import "./i18n.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
  </StrictMode>
);