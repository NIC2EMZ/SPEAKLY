/* ==========================================================================
   SPEAKLY — service-worker.js : mise en cache pour un usage hors-ligne
   --------------------------------------------------------------------------
   L'app n'a besoin d'aucun serveur : une fois les fichiers en cache, elle
   fonctionne en avion, dans le métro, sans réseau. Stratégie :
   « réseau d'abord pour le HTML, cache d'abord pour le reste », avec repli
   sur le cache quand le réseau est absent.
   ========================================================================== */
'use strict';

var VERSION = 'speakly-v1';
var SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/core/util.js',
  './js/core/assets.js',
  './js/core/store.js',
  './js/core/speech.js',
  './js/core/sfx.js',
  './js/core/audio.js',
  './js/core/ui.js',
  './js/core/charts.js',
  './js/core/router.js',
  './js/data/i18n.js',
  './js/data/000-missions-de.js',
  './js/data/000-missions-de2.js',
  './js/data/000-missions-multi.js',
  './js/data/000-pron-dialogues.js',
  './js/data/prompts.js',
  './js/data/ui-strings.js',
  './js/data/080-badges.js',
  './js/data/content.js',
  './js/screens/splash.js',
  './js/screens/onboarding.js',
  './js/screens/home.js',
  './js/screens/mission.js',
  './js/screens/help.js',
  './js/screens/recording.js',
  './js/screens/free.js',
  './js/screens/review.js',
  './js/screens/results.js',
  './js/screens/pronounce.js',
  './js/screens/conversation.js',
  './js/screens/progress.js',
  './js/screens/profile.js',
  /* visuels : drapeaux ronds et pictos */
  './assets/img/flag-de.png',
  './assets/img/flag-us.png',
  './assets/img/flag-gb.png',
  './assets/img/flag-es.png',
  './assets/img/flag-pt.png',
  './assets/img/flag-br.png',
  './assets/img/flag-fr.png',
  './assets/img/flag-it.png',
  './assets/img/flag-ko.png',
  './assets/img/flag-ja.png',
  './assets/img/flag-zh.png',
  './assets/img/flag-ar.png',
  './assets/img/flag-hi.png',
  './assets/img/flag-tr.png',
  './assets/img/flag-ru.png',
  './assets/img/flag-be.png',
  './assets/img/icon-travail.png',
  './assets/img/icon-etudes.png',
  './assets/img/icon-calendrier.png',
  './assets/img/guide-avatar.png',
  './assets/img/guide-full.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      // addAll échoue en bloc si un seul fichier manque : on tolère les absents
      return Promise.all(SHELL.map(function (url) {
        return cache.add(url).catch(function () { return null; });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;      // polices Google : laissées au réseau

  var isDocument = req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') >= 0;

  if (isDocument) {
    // réseau d'abord (pour recevoir les mises à jour), cache en secours
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) { return hit || caches.match('./index.html'); });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
    })
  );
});
