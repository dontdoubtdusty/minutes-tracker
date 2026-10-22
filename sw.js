// Offline helper. Always tries the internet first, so new versions show up right away;
// falls back to the last saved copy when there's no connection. Your timecard data is never touched here.
const CACHE = 'timecard-v1';
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';

self.addEventListener('install', e => {
  self.skipWaiting();
  // Keep the app and the PDF reader on hand so a shared PDF can be read without signal
  e.waitUntil(caches.open(CACHE).then(c => Promise.all([
    c.addAll(['./', 'index.html', 'feedback.js', 'manifest.webmanifest']).catch(() => {}),
    ...['pdf.min.js', 'pdf.worker.min.js'].map(f => fetch(PDFJS + f, { mode: 'no-cors' }).then(r => c.put(PDFJS + f, r)).catch(() => {}))
  ])));
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  const r = e.request, url = new URL(r.url);

  // A PDF shared from another app (Android share menu): stash it, then open the app to read it
  if (r.method === 'POST' && url.pathname.endsWith('/share')) {
    e.respondWith((async () => {
      try {
        const f = (await r.formData()).get('pdf');
        if (f) await (await caches.open('shared')).put('./shared.pdf',
          new Response(f, { headers: { 'content-type': 'application/pdf', 'x-name': encodeURIComponent(f.name || 'shared.pdf') } }));
      } catch (err) {}
      return Response.redirect('./?shared=1', 303);
    })());
    return;
  }
  if (r.method !== 'GET') return;

  e.respondWith(fetch(r).then(res => {
    if (res.ok || res.type === 'opaque') { const c = res.clone(); caches.open(CACHE).then(k => k.put(r, c)) }
    return res;
  }).catch(() => caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('./') : undefined))));
});
