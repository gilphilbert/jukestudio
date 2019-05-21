importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.routing.registerRoute(
  '.',
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  'index.html',
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  /\.css$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  /\.(?:png|jpg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 40,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
