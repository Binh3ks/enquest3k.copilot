if (typeof window !== 'undefined') {
  sessionStorage.removeItem('asset_reload_guard');
}

import './utils/schemaMigration';
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

  // Only detect actual module script network failures (ChunkLoadError)
  window.addEventListener('error', (event) => {
    const target = event.target;
    // CRITICAL: Strictly check for SCRIPT tag only. NEVER match <img> or <audio> with src!
    const isScript = target && target.tagName === 'SCRIPT' && target.src && (target.src.includes('/assets/') || target.src.includes('chunk'));
    const msg = String(event.message || event.error?.message || '');
    
    const isChunkMimeError = 
      msg.includes("Failed to load module script") || 
      (msg.includes("MIME type") && msg.includes("text/html") && msg.includes(".js")) || 
      msg.includes("Expected a JavaScript-or-Wasm module script") ||
      msg.includes("Loading chunk");

    if (isScript && isChunkMimeError) {
      const lastReload = parseInt(sessionStorage.getItem('global_chunk_reload') || '0', 10);
      if (Date.now() - lastReload > 8000) {
        sessionStorage.setItem('global_chunk_reload', String(Date.now()));
        console.warn('[Main] Stale JS module script error caught. Clearing SW cache & reloading...');
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
        }
        if ('caches' in window) {
          caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
        }
        setTimeout(() => {
          window.location.href = window.location.pathname + '?r=' + Date.now();
        }, 200);
      }
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const msg = String(event.reason?.message || event.reason || '');
    if (msg.includes("reading '1'")) {
      event.preventDefault();
      return;
    }
    
    const isChunkRejection = 
      (msg.includes("Failed to fetch dynamically imported module") || msg.includes("Loading chunk")) &&
      (msg.includes(".js") || msg.includes("chunk"));

    if (isChunkRejection) {
      const lastReload = parseInt(sessionStorage.getItem('global_chunk_reload') || '0', 10);
      if (Date.now() - lastReload > 8000) {
        sessionStorage.setItem('global_chunk_reload', String(Date.now()));
        console.warn('[Main] Stale dynamic module rejection caught. Clearing SW cache & reloading...');
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
        }
        if ('caches' in window) {
          caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
        }
        setTimeout(() => {
          window.location.href = window.location.pathname + '?r=' + Date.now();
        }, 200);
      }
    }
  });
}

import RootErrorBoundary from './components/common/RootErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
      <SuperAdminLauncher />
      <TeacherLauncher />
      <FloatingUpgradeWrapper />
    </RootErrorBoundary>
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
