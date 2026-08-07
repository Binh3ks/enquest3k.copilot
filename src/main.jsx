import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FloatingUpgradeWrapper from './components/subscription/FloatingUpgradeWrapper';
import SuperAdminLauncher from './components/subscription/SuperAdminLauncher';
import TeacherLauncher from './components/teacher/TeacherLauncher';
import { TTSPreload } from './services/ttsPreload';

// Global error handler — suppresses the untraceable "reading '1'" error
// that occurs in the shadowing flow. Logs the error to console for debugging.
// This error doesn't crash the UI (functionality still works), so we just
// suppress the noise. Once source maps are enabled, this can be removed.
if (typeof window !== 'undefined') {
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (message && message.includes("reading '1'") && message.includes('undefined')) {
      console.warn('[Main] Suppressed known undefined-1 error (non-fatal)');
      return true;  // Suppress
    }
    if (originalOnError) {
      return originalOnError.call(this, message, source, lineno, colno, error);
    }
    return false;
  };
  window.addEventListener('unhandledrejection', (event) => {
    const msg = String(event.reason?.message || event.reason || '');
    if (msg.includes("reading '1'")) {
      console.warn('[Main] Suppressed known undefined-1 rejection (non-fatal)');
      event.preventDefault();
    } else if (msg.includes("dynamically imported module") || msg.includes("MIME type")) {
      const lastReload = parseInt(sessionStorage.getItem('global_chunk_reload') || '0', 10);
      if (Date.now() - lastReload > 5000) {
        sessionStorage.setItem('global_chunk_reload', String(Date.now()));
        console.warn('[Main] Stale CDN chunk error detected. Clearing SW cache & reloading...');
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
        }
        if ('caches' in window) {
          caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
        }
        setTimeout(() => {
          window.location.href = window.location.pathname + '?r=' + Date.now();
        }, 150);
      }
    }
  });
}

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

// Unregister legacy Service Workers to force fresh asset fetching
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
  }).catch(() => {});
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
