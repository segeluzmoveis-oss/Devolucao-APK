const CACHE_NAME = "devolucao-eluz-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./sucesso.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./fundo-eluz-azul.png",
  "./logo-eluz-3d.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((response) => response || caches.match("./index.html")))
  );
});
