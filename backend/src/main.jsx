// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { UserProvider } from './contexts/UserContext.jsx'; // הוספנו

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserProvider> {/* עוטפים את כל האפליקציה ב-UserContext */}
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>,
)