/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.4.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.4.1"});

importScripts(
  "precache-manifest.4d7e4f53f77b7335b9a8f9f24f0ec829.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/data\/\d+\.json/, workbox.strategies.cacheFirst({ cacheName: "cache-data", plugins: [new workbox.expiration.Plugin({"maxEntries":5,"maxAgeSeconds":604800,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:js|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
