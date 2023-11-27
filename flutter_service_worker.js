'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "9c3eda0f94f01e38d835cd9c061598f6",
"assets/AssetManifest.bin.json": "2185fd223cbaf4fff78de3a4dd8b2bfd",
"assets/AssetManifest.json": "f954d9b36b1b4e71dcaa4745a7d565aa",
"assets/assets/images/app%2520logo.png": "ae622f60f67f5adb194a37f673743679",
"assets/assets/images/avarage%2520rides.png": "e01fddfd368437810075740bef39eecc",
"assets/assets/images/chevron_right_black_24dp%25201.png": "cdca49770610195a33d1ca1d40b47674",
"assets/assets/images/clear_black_24dp%2520(1)%25201.png": "c5766ff66bd592b280c09e2438ed2b73",
"assets/assets/images/img_1.png": "6b122b6fb674741742a665141f96a961",
"assets/assets/images/logo.png": "f9309a7afd2850dc0ce45b27e5b914c5",
"assets/assets/images/payment.png": "068bbed7eee3122242d64f5a22ae7412",
"assets/assets/images/revenue.png": "126ab294049764c4b6ea9c716f96363e",
"assets/assets/images/rideoptionslogo.png": "4f3abec8f7517b2778f90efe1df5a2a6",
"assets/assets/images/rides.png": "437a5697445211d3ec06f008cf7ff53d",
"assets/assets/images/WhatsApp%2520Image%25202023-10-04%2520at%25202.52.02%2520PM.jpeg": "47188ad9359c296e692a2ace870aa55c",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "752c82e7aa8492ed6d8ae38684650e82",
"assets/NOTICES": "a9ba9637893f106c48c930350388556b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "64edb91684bdb3b879812ba2e48dd487",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "f87e541501c96012c252942b6b75d1ea",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "4124c42a73efa7eb886d3400a1ed7a06",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "33b0f45575a2b332fa5d0fa404651b79",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "240281d396534ec95d8b7caee5e95417",
"icons/Icon-512.png": "b65bb72e543cd42768fdebe3312ccdb3",
"icons/Icon-maskable-192.png": "240281d396534ec95d8b7caee5e95417",
"icons/Icon-maskable-512.png": "b65bb72e543cd42768fdebe3312ccdb3",
"index.html": "25ce550e9afa0a434c209220e1ec13dd",
"/": "25ce550e9afa0a434c209220e1ec13dd",
"main.dart.js": "831146a1c21f9c27703421d0ce8cc7ca",
"manifest.json": "d2a9c090ebf8f15c475088632d0e20fe",
"splash/img/dark-1x.png": "fa344e3ded43352d685aad16bcb79880",
"splash/img/dark-2x.png": "cb550e94269b3a482e18527ee0f8f952",
"splash/img/dark-3x.png": "2c6f1adc0fdf40ed226bda10d72e6c40",
"splash/img/dark-4x.png": "b65bb72e543cd42768fdebe3312ccdb3",
"splash/img/light-1x.png": "fa344e3ded43352d685aad16bcb79880",
"splash/img/light-2x.png": "cb550e94269b3a482e18527ee0f8f952",
"splash/img/light-3x.png": "2c6f1adc0fdf40ed226bda10d72e6c40",
"splash/img/light-4x.png": "b65bb72e543cd42768fdebe3312ccdb3",
"version.json": "a08e0b5f591c3076b795c602ad21832a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
