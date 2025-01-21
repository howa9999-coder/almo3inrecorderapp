const CACHE_NAME = "app-cache-v2"; // Update version when you add/remove assets
const OFFLINE_PAGE = "offline.html"; // Fallback offline page

const urlsToCache = [
  "index.html",
  "index.js",
  "manifest.json",
  "main.css",
  "main.js",
  "icon192.png",
  "icon512.ico",
  OFFLINE_PAGE, // Add fallback page to cache
];

// Install service worker and cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activate new service worker immediately
});

// Activate service worker and remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Delete outdated cache
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all clients immediately
});

// Fetch resources with offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return cached resource
      }
      return fetch(event.request).catch(() => {
        // Fallback to offline page for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match(OFFLINE_PAGE);
        }
      });
    })
  );
});

/* const CACHE_NAME = "app-cache-v2"; // Increment this version when you update files
const urlsToCache = [
  "index.html",
  "index.js",
  "manifest.json",
  "main.css",
  "main.js",
  "icon192.png",
  "icon512.ico",
];

// Install service worker and cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Immediately activate new service worker
});

// Activate service worker and remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Delete old cache
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all clients immediately
});

// Fetch resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
 */