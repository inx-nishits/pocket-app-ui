const CACHE_NAME = 'pocket-app-v1';
const ASSETS = [
  '/',
  '/index-a.html',
  '/index-b.html',
  '/index-c.html',
  '/index-d.html',
  '/index.html',
  '/manifest.json',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/search.svg',
  '/images/filter.svg',
  '/images/star.svg',
  '/images/attach.svg',
  '/images/home.svg',
  '/images/clock.svg',
  '/images/checklist.svg',
  '/images/contact-us.svg',
  '/images/bar.svg',
  '/images/AI.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
