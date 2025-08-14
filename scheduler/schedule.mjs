// scripts/schedule.ts
import cron from 'node-cron';
import fetch from 'node-fetch';

cron.schedule('*/2 * * * *', async () => {
  console.log('⏰ Перевірка статусів оплат...');
  const res = await fetch('http://app:3000/api/check-all-pending-orders');
  const data = await res.json();
  console.log('Результат перевірки:', data);
});

cron.schedule('0 * * * *', async () => {
  console.log('⏰ Оновлення фіду...');

  try {
    const res = await fetch('http://app:3000/api/generate-meta-feed');
    // Якщо статус не успішний — викидаємо помилку
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Unknown error');
    }

    const data = await res.json();
    console.log('✅ Результат оновлення фіду:', data.message);
  } catch (error) {
    console.error('❌ Помилка оновлення фіду:', error.message || error);
  }
});
