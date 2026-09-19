// Voice Notes service worker.
// The browser updates sw.js automatically; install refreshes the same shell cache,
// so changing app files no longer depends on manually bumping a version string.
const CACHE = 'voice-notes-shell-v3-4';
const OLD_PREFIX = 'voice-notes-';
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // addAll performs fresh requests during SW installation and replaces stale entries.
    await cache.addAll(SHELL.map((url) => new Request(url, { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key !== CACHE && key.startsWith(OLD_PREFIX))
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navigations are network-first so a new index.html is picked up immediately,
  // with the cached shell as the offline fallback.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) cache.put('index.html', fresh.clone());
        return fresh;
      } catch {
        return (await cache.match('index.html')) || new Response('Offline', { status: 503, statusText: 'Offline' });
      }
    })());
    return;
  }

  // Static shell: cached immediately, refreshed in the background.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true });
    const network = fetch(req, { cache: 'no-cache' })
      .then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      })
      .catch(() => null);
    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    return (await network) || new Response('Offline', { status: 503, statusText: 'Offline' });
  })());
});
