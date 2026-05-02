const CACHE = 'notebook-v1';
const ASSETS = [
  '/notebook-mockup/',
  '/notebook-mockup/index.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // 翻譯 API 永遠走網路（不 cache）
  if (e.request.url.includes('mymemory.translated.net')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      // 有 cache 先回傳，同時背景更新
      const network = fetch(e.request).then(res => {
        if (res.ok) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => null);
      return cached || network;
    })
  );
});
