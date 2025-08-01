// scripts/schedule.ts
import cron from 'node-cron';
import fetch from 'node-fetch';

cron.schedule('*/2 * * * *', async () => {
  console.log('⏰ Перевірка статусів оплат...');
  const res = await fetch('https://riksi.com.ua/api/check-all-pending-orders');
  const data = await res.json();
  console.log('Результат перевірки:', data);
});
