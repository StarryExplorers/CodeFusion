const CACHE_NAME = "codefusion-cache-v1";
const FILES_TO_CACHE = [
  "/CodeFusion/",
  "/CodeFusion/index.html",
  "/CodeFusion/viewer.html",
  "/CodeFusion/manifest.json",
  "/CodeFusion/icon-192.png",
  "/CodeFusion/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
