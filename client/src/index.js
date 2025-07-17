import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import './assets/style/font-family.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);  