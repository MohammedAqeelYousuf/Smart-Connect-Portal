const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/json/db.json',
  '/modules/admin-dashboard.js',
  '/modules/announcement.js',
  '/modules/auth.js',
  '/modules/commonFeature.js',
  '/modules/dashboard.js',
  '/modules/events.js',
  '/modules/form-validation.js',
  '/modules/profile.js',
  '/modules/register.js',
  '/modules/view-feedback.js',
  '/pages/admin-dash.html',
  '/pages/announcement.html',
  '/pages/auth/login.html',
  '/pages/auth/register.html',
  '/pages/dashboard.html',
  '/pages/events.html',
  '/pages/feedback-home.html',
  '/pages/home.html',
  '/pages/profile.html',
  '/pages/stud-dash.html',
  '/pages/view-feedback.html',
  '/public/event.jpg',
  '/public/feedback.jpg',
  '/public/meeting-1.png',
  '/styles/admin-dashboard.css',
  '/styles/announcement.css',
  '/styles/events.css',
  '/styles/feedback.css',
  '/styles/index.css',
  '/styles/stud-dashboard.css',
  '/styles/style.css',
  '/tsconfig.json',
  '/typescript-modules/commonFeature.ts',
  '/typescript-modules/form-validation.ts',
  '/typescript-modules/profile.ts'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
});