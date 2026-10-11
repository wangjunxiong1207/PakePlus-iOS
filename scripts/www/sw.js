const CACHE='stu-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', e => {
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request);
    const network = fetch(e.request).then(resp => { cache.put(e.request, resp.clone()); return resp; }).catch(()=>cached);
    return cached || network;
  }));
});