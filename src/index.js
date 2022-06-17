import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './hooks/auth';
import { CartProvider } from './hooks/cart';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './app';
import './styles/global.css';
import { AlertProvider } from './hooks/alert';

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
    <AuthProvider>
    <CartProvider >
      <App />
    </CartProvider>
    </AuthProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);