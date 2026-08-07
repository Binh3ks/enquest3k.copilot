// EngQuest Service Worker — handles push notifications

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data?.json() || {}; } catch (_) {}

  const title = data.title || 'EngQuest';
  const options = {
    body: data.body || 'Có thông báo mới',
    icon: 'https://app.bkbacademy.vn/icon-192.png',
    badge: 'https://app.bkbacademy.vn/icon-96.png',
    tag: data.tag || 'engquest',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ('focus' in client) return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});

// Basic install/activate — no caching needed (app is on Cloudflare Pages CDN)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => clients.claim())
  );
});

// Always fetch JS assets directly from network, bypass SW cache
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/assets/') || event.request.destination === 'script') {
    event.respondWith(fetch(event.request));
  }
});
