import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FloatingUpgradeWrapper from './components/subscription/FloatingUpgradeWrapper';
import SuperAdminLauncher from './components/subscription/SuperAdminLauncher';
import TeacherLauncher from './components/teacher/TeacherLauncher';
import { TTSPreload } from './services/ttsPreload';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <App />
      <SuperAdminLauncher />
      <TeacherLauncher />
      <FloatingUpgradeWrapper />
    </>
  </React.StrictMode>,
)

// 🔥 Pre-warm TTS server and cache common phrases (background, non-blocking)
TTSPreload.initialize().catch(err => {
  console.warn('[Main] TTS preload failed:', err);
});

// Register service worker for Web Push notifications
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(reg => console.log('[SW] Registered, scope:', reg.scope))
    .catch(err => console.warn('[SW] Registration failed:', err));
}

// --- Anti-copy enforcement: block copy/cut/paste/contextmenu on non-editable UI ---
const isEditableTarget = (el) => {
  if (!el) return false;
  if (el.nodeType !== Node.ELEMENT_NODE) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
  if (el.isContentEditable) return true;
  if (el.closest && el.closest('input, textarea, [contenteditable="true"]')) return true;
  return false;
};

const blockCopyHandler = (e) => {
  if (!isEditableTarget(e.target)) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  return true;
};

document.documentElement.classList.add('no-select');
document.addEventListener('copy', blockCopyHandler, true);
document.addEventListener('cut', blockCopyHandler, true);
document.addEventListener('paste', (e) => {
  if (!isEditableTarget(e.target)) { e.preventDefault(); e.stopPropagation(); }
}, true);
document.addEventListener('contextmenu', (e) => {
  if (!isEditableTarget(e.target)) { e.preventDefault(); }
}, true);
