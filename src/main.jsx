import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FloatingUpgradeWrapper from './components/subscription/FloatingUpgradeWrapper';
import SuperAdminLauncher from './components/subscription/SuperAdminLauncher';
import { TTSPreload } from './services/ttsPreload';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <App />
      <SuperAdminLauncher />
      <FloatingUpgradeWrapper />
    </>
  </React.StrictMode>,
)

// 🔥 Pre-warm TTS server and cache common phrases (background, non-blocking)
TTSPreload.initialize().catch(err => {
  console.warn('[Main] TTS preload failed:', err);
});
