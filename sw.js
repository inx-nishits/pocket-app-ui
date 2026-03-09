const CACHE_NAME = 'pocket-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './variant-a/index.html',
  './variant-a/menu.html',
  './variant-a/manifest.json',
  './variant-b/index.html',
  './variant-b/manifest.json',
  './images/Ps-pro-logo.png',
  './images/search.svg',
  './images/filter.svg',
  './images/star.svg',
  './images/star-sm.svg',
  './images/attech.svg',
  './images/all.svg',
  './images/summary.svg',
  './images/either-way.svg',
  './images/Indictable.svg',
  './images/ai.svg',
  './images/bar.svg',
  './images/checklist.svg',
  './images/contact-us.svg',
  './images/megaphone.svg',
  './images/ps-podcast.svg'
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
