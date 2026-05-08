const CACHE_NAME = 'pocket-app-v10';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './variant-a/index.html',
  './variant-a/menu.html',
  './variant-a/checklist.html',
  './variant-a/checklist-detail.html',
  './variant-a/manifest.json',

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
  './images/phone-call.svg',
  './images/menu_icons/app_incubator.png',
  './images/menu_icons/books.png',
  './images/menu_icons/cake-offences.png',
  './images/menu_icons/case-file.png',
  './images/menu_icons/check-updates.png',
  './images/menu_icons/dark-mode.png',
  './images/menu_icons/find-a-mispar.png',
  './images/menu_icons/get-in-touch.png',
  './images/menu_icons/hughes-guides.png',
  './images/menu_icons/light-mode.png',
  './images/menu_icons/more-apps.png',
  './images/menu_icons/notifications.png',
  './images/menu_icons/pnd-codes.png',
  './images/menu_icons/police-regulation.png',
  './images/menu_icons/reference-library.png',
  './images/menu_icons/self-care.png',
  './images/menu_icons/subscription.png',
  './images/menu_icons/vehicle-check.png',
  './images/menu_icons/what-three-words.png'
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
