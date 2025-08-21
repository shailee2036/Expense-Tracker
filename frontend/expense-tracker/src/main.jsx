import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="750400898640-h27cl7e61a83urmqglffmhanc39orp6q.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    
  </StrictMode>,
)
