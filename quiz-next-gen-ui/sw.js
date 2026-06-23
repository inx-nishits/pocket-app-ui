const CACHE_NAME = 'pocket-app-v77';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './variant-a/index.html',
  './variant-a/menu.html',
  './variant-a/checklist.html',
  './variant-a/checklist-detail.html',
  './variant-a/manifest.json',
  './variant-b/index.html',
  './variant-b/menu.html',
  './variant-b/checklist.html',
  './variant-b/checklist-detail.html',
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
  './images/ps-podcast.svg',
  './images/tags.svg',
  './images/phone-call.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Network First strategy for HTML files to avoid stale data
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cacheCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cacheCopy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache First for everything else (images, styles, scripts)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
