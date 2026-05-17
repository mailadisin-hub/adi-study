/* =========================================================================
   SERVICE WORKER
   App shell: NETWORK-FIRST so updates show on next refresh.
   Other assets (icons, fonts): cache-first.
   Firebase / Google APIs: bypass cache entirely.
   ========================================================================= */

const CACHE = 'adi-study-v4';
const SHELL = ['./', 'index.html', 'app.js', 'firebase-config.js', 'manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Pass through Firebase + Google requests (real-time)
  if (url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic')) {
    return;
  }

  if (e.request.method !== 'GET') return;

  const path = url.pathname;
  const isShell =
    path === '/' || path.endsWith('/') ||
    path.endsWith('.html') ||
    path.endsWith('.js') ||
    path.endsWith('.json');

  if (isShell) {
    // Network first — fall back to cache only if offline
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok && url.origin === self.location.origin) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache first — for icons, fonts, etc
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchP = fetch(e.request).then(res => {
          if (res.ok && url.origin === self.location.origin) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        }).catch(() => cached);
        return cached || fetchP;
      })
    );
  }
});

// Listen for SKIP_WAITING message from clients (used to force update)
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
