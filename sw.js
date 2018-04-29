var currentCacheName = 'cache-v3';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'css/styles.css',
        'node_modules/idb/lib/idb.js',
        'css/responsive-grid.css',
        'data/restaurants.json',
        'index.js',
        'restaurant.js',
        'restaurant.html'
      ])
    })
  )
});

self.addEventListener('fetch', function(event) {

  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {

      if (caches.match('/')) {
        event.respondWith(caches.match('/'));
      }

      return;

    }

  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('cache-') &&
                 cacheName !== currentCacheName
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
