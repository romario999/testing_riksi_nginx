import { ProductStickers, UserRole } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Білизна',
    categoryUrl: 'bilyzna',
    description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до нашого каталогу жіночої білизни на RIKSI.ua! У нас широкий асортимент бюстгальтерів, трусиків, поясів та аксесуарів до них. Кожен предмет білизни в нашому асортименті - це поєднання вишуканого дизайну та найвищої якості. У нас ви знайдете різноманіття кроїв та кольорів.</p>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Наші бюстгальтери поєднують зручність та стиль. Ми хочемо, щоб вдягнувши його Ви відчули себе впевненою та красивою.</p>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Трусики - це важлива частина Вашого гардероба. У нашому асортименті представлена ​​різноманітність фасонів та тканин, щоб ви могли знайти ідеальний варіант.</p>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Пояси та аксесуари - не відʼємна частина кожної сучасної жінки. Вони дають нотку елегантності та завершеності Вашому комплекту білизни.</p>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Знайдіть ідеальну жіночу білизну на RIKSI.ua та перетворіть кожен день у святкову подію!</p>',
    isActive: true,
    subcategories: [
      { name: 'Бюстгальтери', subcategoryUrl: 'biusthaltery', isActive: true, description: '<div class="text"><p style="text-align: justify;">Шукаєте бюстгальтер, який буде не лише красивим, але й зручним? RIKSI пропонує широкий асортимент бюстгальтерів на будь-який смак і тип фігури.</p><br /><p style="text-align: justify;">Ідеальна посадка: Наші бюстгальтери розроблені з урахуванням анатомічних особливостей жіночого тіла, щоб забезпечити ідеальну посадку та максимальний комфорт протягом дня.</p><br /><p style="text-align: justify;">Трендові моделі: Ми постійно оновлюємо нашу колекцію бюстгальтерів, щоб запропонувати вам наймодніші та актуальні моделі.</p><br /><p style="text-align: justify;">Доступні ціни: Ми віримо, що якісна білизна має бути доступною для кожної жінки. Тому ми пропонуємо бюстгальтери за доступними цінами без шкоди для якості.</p><br /><p style="text-align: justify;">Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції бюстгальтерів, які допоможуть вам створити неповторний образ.</p><br /><p style="text-align: justify;">RIKSI - ваш секрет краси та комфорту.</p></div>'},
      { name: 'Трусики', subcategoryUrl: 'trusyky', isActive: true,description: '<div class="text"><p style="text-align: justify;">Шукаєте трусики, які поєднують в собі комфорт, стиль та якість? RIKSI пропонує широкий асортимент трусиків на будь-який смак і тип фігури.</p><br/><p style="text-align: justify;">Комфорт на весь день: Наші трусики виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</p><br/><p style="text-align: justify;">Стильні та трендові моделі: Ми постійно оновлюємо нашу колекцію трусиків, щоб запропонувати вам наймодніші та актуальні моделі.</p><br/><p style="text-align: justify;">Доступні ціни: Ми віримо, що якісна білизна має бути доступною для кожної жінки. Тому ми пропонуємо трусики за доступними цінами без шкоди для якості.</p><br/><p style="text-align: justify;">Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції трусиків, які допоможуть вам створити неповторний образ.</p><br/><p style="text-align: justify;">RIKSI - ваш комфорт та впевненість</p><br/></div>' },
      { name: 'Пояси', subcategoryUrl: 'poiasy', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте пояс, який підкреслить вашу фігуру та забезпечить комфорт протягом дня? RIKSI пропонує широкий асортимент поясів на будь-який смак і тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Ідеальна посадка: Наші пояси розроблені з урахуванням анатомічних особливостей жіночого тіла, щоб забезпечити ідеальну посадку та максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Трендові моделі: Ми постійно оновлюємо нашу колекцію поясів, щоб запропонувати вам наймодніші та актуальні моделі.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісна білизна має бути доступною для кожної жінки. Тому ми пропонуємо пояси за доступними цінами без шкоди для якості.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції поясів, які допоможуть вам створити неповторний образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI - ваш секрет краси та підкреслення фігури.</p></div>' },
    ],
  },
  {
    name: 'Боді',
    categoryUrl: 'body',
    description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе світ елегантних боді від RIKSI. Наші моделі поєднують у собі вишуканий дизайн та високу якість. Оберіть боді, яке виражає Ваш стиль та додає вишуканості Вашому образу.</p>       <p style="text-align: justify; font-size: 18px; font-weight: bold; line-height: 1.6; color: #222; margin-bottom: 20px;">RIKSI пропонує широкий асортимент боді на будь-який смак:</p>       <ul style="padding-left: 20px; margin-bottom: 20px;">         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Класичні боді: Ідеально підходять для створення офіційного або ділового образу.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Боді з мереживом: Додадуть романтики та жіночності Вашому образу.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Боді з відкритими плечима: Підкреслять Вашу красу та сексуальність.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Боді з довгими рукавами: Ідеально підходять для прохолодної погоди.</li>       </ul>       <p style="text-align: justify; font-size: 18px; font-weight: bold; line-height: 1.6; color: #222; margin-bottom: 20px;">Переваги боді RIKSI:</p>       <ul style="padding-left: 20px; margin-bottom: 20px;">         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла та не викликають подразнення.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Ідеальна посадка: Розроблені з урахуванням анатомічних особливостей жіночого тіла, щоб забезпечити комфорт протягом дня.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми постійно оновлюємо нашу колекцію боді, щоб запропонувати Вам наймодніші та актуальні моделі.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісна білизна має бути доступною для кожної жінки. Тому ми пропонуємо боді за доступними цінами без шкоди для якості.</li>       </ul>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З боді RIKSI Ви завжди будете почувати себе впевнено та неперевершено.</p>',
    subcategories: [],
  },
  {
    name: 'Спідниці',
    categoryUrl: 'spidnytsi',
    description: '<font style="vertical-align: inherit;">Знайдіть свою ідеальну спідницю! У нас представлений широкий вибір стильних та якісних моделей, які створюють неповторний образ для будь-якої події.</font>',
    subcategories: [],
  },
  {
    name: 'Легінси',
    categoryUrl: 'lehinsy',
    description: '',
    subcategories: [],
  },
  {
    name: 'Домашній одяг',
    categoryUrl: 'domashniy-odiah',
    description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до каталогу домашнього одягу на RIKSI.ua! У нас представлені лонгсліви, шорти, топи, футболки, кардигани, сорочки, халати та штани. Обирайте найкращий одяг для комфорту та затишку вдома. Насолоджуйтесь шкірною міттю у Вашому улюбленому одежі.</p><p style="text-align: justify; font-size: 18px; font-weight: bold; line-height: 1.6; color: #222; margin-bottom: 20px;">RIKSI пропонує широкий асортимент домашнього одягу на будь-який смак:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лонгсливи: Мʼякі та затишні лонгсливи ідеально підходять для прохолодних вечорів і холодних ранків.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Шорти: Зручні та стильні шорти стануть незамінною частиною Вашого гардеробу для домашнього відпочинку.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Топи: Комфортні топи стануть основою Ваших домашніх образів.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Футболки: Мʼякі футболки з логотипом RIKSI або цікавими написами підкреслять Ваш стиль.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Кардигани: Мʼякі та елегантні кардигани зігрівають Вас у прохолодну погоду.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Сорочки: Сорочки з легких та приємних до тіла тканин стануть Вашим улюбленим одягом для домашнього відпочинку.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Халати: Мʼякі та затишні халати з натуральних тканин дарують Вам відчуття комфорту та затишку.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Штани: Зручні та стильні штани з бавовни або трикотажу стануть Вашим улюбленим одягом для домашнього відпочинку.</li></ul><p style="text-align: justify; font-size: 18px; font-weight: bold; line-height: 1.6; color: #222; margin-bottom: 20px;">Переваги домашнього одягу RIKSI:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Виготовлений з мʼяких, натуральних матеріалів, які приємні до тіла та не викликають подразнення.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Зручний крій: Одяг RIKSI розроблений з урахуванням анатомічних особливостей жіночого тіла, щоб забезпечити максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент домашнього одягу на будь-який смак, який підкреслить Ваш стиль та індивідуальність.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому ми пропонуємо одяг за доступними цінами без шкоди для якості.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З домашнім одягом RIKSI Ви завжди будете відчувати себе комфортно та затишно.</p>',
    subcategories: [
      { name: 'Топи', subcategoryUrl: 'topy',isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте зручний та стильний топ для домашнього відпочинку? RIKSI пропонує широкий асортимент топів на будь-який смак та тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші топи виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент топів на будь-який смак: одноколірні, з принтами, з короткими та довгими рукавами, облягаючі та вільні.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому ми пропонуємо топи за доступними цінами без шкоди для якості.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції топів, які допоможуть Вам створити неповторний образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З топами RIKSI Ви завжди будете почувати себе комфортно та затишно.</p></div>' },
      { name: 'Футболки', subcategoryUrl: 'futbolky', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте зручну та стильну футболку для домашнього відпочинку? RIKSI пропонує широкий асортимент футболок на будь-який смак та тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші футболки виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент футболок на будь-який смак: одноколірні, з принтами, з короткими та довгими рукавами, облягаючі та вільні.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому ми пропонуємо футболки за доступними цінами без шкоди для якості.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції футболок, які допоможуть Вам створити неповторний образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З футболками RIKSI Ви завжди будете почувати себе комфортно та затишно.</p></div>' },
      { name: 'Лонгсліви', subcategoryUrl: 'longslivy', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте мʼякий та затишний лонгслів для прохолодних вечорів вдома? RIKSI пропонує широкий асортимент лонгслівів на будь-який смак та тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші лонгсліви виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент лонгслівів на будь-який смак: одноколірні, з принтами, з довгими рукавами, облягаючі та вільні.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому ми пропонуємо лонгсліви за доступними цінами без шкоди для якості.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції лонгслівів, які допоможуть Вам створити неповторний образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З лонгслівами RIKSI Вам завжди буде тепло та затишно.</p></div>' },
      { name: 'Кардигани', subcategoryUrl: 'kardyhany', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Навіть вдома хочеться виглядати стильно та відчувати себе комфортно. Кардигани RIKSI - ідеальне рішення для прохолодних вечорів.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент кардиганів на будь-який смак: однотонні, з візерунками, довгі та короткі, на ґудзиках або блискавці.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші кардигани виготовлені з мʼяких та приємних до тіла матеріалів, які забезпечать тепло та комфорт.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Універсальність: Кардигани RIKSI можна легко поєднувати з іншим домашнім одягом, таким як штани, лонгсліви або футболки.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що стильний домашній одяг має бути доступним. Тому пропонуємо кардигани за приємними цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, знайдете також лімітовані колекції кардиганів, які допоможуть виділитись.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З кардиганами RIKSI Ви завжди будете виглядати стильно та відчувати себе затишно вдома.</p></div>' },
      { name: 'Сорочки', subcategoryUrl: 'sorochky', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте зручну та стильну сорочку для домашнього відпочинку? RIKSI пропонує широкий асортимент сорочок на будь-який смак та тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші сорочки виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент сорочок на будь-який смак: одноколірні, з візерунками, вільні та приталені, з ґудзиками.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Універсальність: Сорочки RIKSI можна легко поєднувати з іншим домашнім одягом, таким як штани, лонгсліви або футболки.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що стильний домашній одяг має бути доступним. Тому пропонуємо сорочки за приємними цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, знайдете також лімітовані колекції сорочок, які допоможуть виділитись.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З сорочками RIKSI Ви завжди будете почувати себе комфортно та затишно вдома.</p></div>' },
      { name: 'Халати', subcategoryUrl: 'halaty', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Пориньте у світ домашнього затишку з розкішними халатами RIKSI. Ми пропонуємо широкий вибір халатів, щоб кожна жінка могла знайти ідеальний варіант для себе.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Неперевершена якість: Виготовлені з натуральних, мʼяких на дотик матеріалів, наші халати забезпечать комфорт та приємні відчуття після душу або ванни.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Розкішний дизайн: Халати RIKSI представлені у різноманітних дизайнах, щоб відповідати вашому стилю. Обирайте однотонні халати або моделі з елегантними візерунками.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Практичність та комфорт: Наші халати мають зручний крій, який не буде сковувати рухів. До того ж різноманітні довжини та фасони дозволять підібрати ідеальний варіант для будь-якої фігури.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: RIKSI вірить, що розкішний домашній одяг має бути доступним для кожної. Тому ми пропонуємо халати за привабливими цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ви також знайдете ексклюзивні халати з лімітованих колекцій, які підкреслять вашу індивідуальність.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З халатами RIKSI відчуття домашнього затишку вийдуть на новий рівень.</p></div>' },
      { name: 'Шорти', subcategoryUrl: 'shorty', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Насолоджуйтесь комфортом та свободою рухів вдома з шортами RIKSI. Ми пропонуємо широкий асортимент шортів на будь-який смак.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші шорти виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла та дозволяють шкірі дихати.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо різноманітні фасони шортів, щоб ви могли обрати модель, яка ідеально підходить вашому стилю. Відкрийте для себе класичні або спортивні моделі, шорти з високою талією або ж вільнішого крою.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, RIKSI пропонує ексклюзивні шорти з лімітованих колекцій, які допоможуть вам створити неповторний образ.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що стильний домашній одяг має бути доступним для кожної жінки. Тому пропонуємо шорти за приємними цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Комфорт та свобода рухів: Шорти RIKSI не будуть сковувати ваших рухів, дозволяючи вам повністю розслабитись вдома.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З шортами RIKSI відчуйте себе вільно та комфортно під час домашнього відпочинку.</p></div>' },
      { name: 'Штани', subcategoryUrl: 'shtany', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте зручні та стильні штани для дому? RIKSI пропонує широкий вибір домашніх штанів, які подарують вам відчуття комфорту та затишку.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші штани виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо різноманітні фасони домашніх штанів, щоб ви могли обрати модель, яка підходить вашому стилю. Відкрийте для себе класичні або спортивні штани, теплі варіанти для прохолодних днів чи легкі літні моделі.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Затишок та комфорт: Штани RIKSI мають зручний крій, який не буде сковувати рухів. Вони ідеально підходять для відпочинку вдома, читання книги, перегляду фільму чи просто для того, щоб відчувати себе комфортно.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому пропонуємо штани за приємними цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, RIKSI пропонує ексклюзивні штани з лімітованих колекцій, які допоможуть вам створити особливий домашній образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З домашніми штанами RIKSI ви завжди будете почувати себе комфортно та стильно вдома.</p></div>' },
    ],
  },
  {
    name: 'Трикотажний одяг',
    categoryUrl: 'trykotazhnyi-odiah',
    description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе неповторний світ трикотажного одягу від RIKSI. Ця категорія включає в себе трикотажний одяг, який підкреслять Вашу індивідуальність. Оберіть кардиган, лонгслів, боді, топ, шорти, штани чи панчохи для створення неперевершеного образу. RIKSI допоможе Вам виразити свій стиль та насолоджуватися кожним моментом у стильному вбранні.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">В нашій категорії трикотажного одягу ви знайдете все, що потрібно для створення затишного та стильного образу. Ми пропонуємо широкий асортимент кардиганів, лонгслівів, боді, топів, шортів, штанів та панчох з високоякісних матеріалів, які приємні до тіла та забезпечують комфорт протягом дня.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Чому варто вибрати трикотажний одяг RIKSI?</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Якість: Ми використовуємо лише найкращі матеріали та фурнітуру, щоб гарантувати нашим клієнтам бездоганну якість продукції.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стиль: Наші дизайнери постійно створюють нові, унікальні моделі, які підкреслять вашу індивідуальність.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Різноманіття: У нас ви знайдете трикотажний одяг на будь-який смак та для будь-якої події.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Вигідні пропозиції: Ми часто проводимо розпродажі та акції, щоб ви могли купити улюблений одяг за ще більш вигідною ціною.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З трикотажним одягом RIKSI ви зможете:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Підкреслити свою фігуру</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Створити затишний та стильний образ</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Відчувати себе впевнено та комфортно протягом дня</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Виразити свою індивідуальність</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Завжди бути в тренді</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Економити час та гроші, купуючи одяг онлайн</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте RIKSI - ваш стиль, ваш комфорт, ваші вигідні покупки!</p></div>',
    subcategories: [
      { name: 'Кардигани', subcategoryUrl: 'kardihany', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З RIKSI ви завжди можете бути впевнені, що ваш домашній одяг буде не лише затишним, але й стильним. Наші кардигани виготовлені з високоякісних матеріалів, які приємні до тіла та не втрачають форму після прання.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI пропонує широкий вибір кардиганів на будь-який смак: від класичних моделей до модних новинок. Ви можете знайти кардигани різноманітних кольорів, фасонів та довжин, які ідеально підкреслять вашу фігуру.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Лімітовані колекції кардиганів RIKSI - це унікальна можливість створити неповторний образ. Наші дизайнери постійно стежать за останніми модними тенденціями, щоб пропонувати вам найактуальніші моделі.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З кардиганами RIKSI ваш домашній одяг буде не лише затишним, але й стильним!</p></div>' },
      { name: 'Боді', subcategoryUrl: 'body', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Боді — це не лише елемент білизни, але й стильний одяг, який може стати основою для багатьох образів. З RIKSI ви можете бути впевнені, що знайдете боді, яке ідеально підійде саме вам.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ми пропонуємо широкий вибір боді з різних матеріалів, фасонів та кольорів. Ви можете знайти боді, яке підкреслить ваші форми, візуально зменшить талію або просто додасть вашому образу трохи пікантності.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI співпрацює з найкращими дизайнерами, щоб гарантувати вам найвищу якість та комфорт. Наші боді виготовлені з високоякісних матеріалів, які приємні до тіла та не втрачають форму після прання.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Лімітовані колекції боді RIKSI - це унікальна можливість придбати ексклюзивну модель, яка підкреслить вашу індивідуальність. Наші дизайнери постійно створюють нові моделі боді, які відповідають останнім модним тенденціям.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З боді RIKSI ви завжди будете на висоті!</p></div>' },
      { name: 'Панчохи', subcategoryUrl: 'panchokhy', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе світ елегантності та комфорту з RIKSI!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Пориньте у вишукані колекції жіночих панчох RIKSI, де поєднуються витонченість, високоякісні матеріали та сучасний дизайн. Це не просто аксесуар, а впевненість у своїй красі та чарівність у будь-якій ситуації.</p><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">Чому слід обирати жіночі панчохи від RIKSI?</p><ul style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; padding-left: 20px;"><li style="margin-bottom: 10px;">- Преміум-матеріали: Ми використовуємо лише першокласні тканини, які забезпечують максимальний комфорт, мʼякість та довговічність.</li><li style="margin-bottom: 10px;">- Ідеальна посадка: Завдяки продуманим розмірам та якісним матеріалам панчохи RIKSI чудово сидять на нозі, не зісковзують і дарують відчуття комфорту протягом дня.</li><li style="margin-bottom: 10px;">- Доступні ціни: Ми пропонуємо вигідні ціни на всі моделі, адже вважаємо, що елегантність та комфорт повинні бути доступними для кожної.</li></ul><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">З жіночими панчохами RIKSI ви:</p><ul style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; padding-left: 20px;"><li style="margin-bottom: 10px;">- Відчуватимете себе впевнено: Вишуканий дизайн та висока якість наших панчох подарують вам відчуття впевненості та неперевершеності.</li><li style="margin-bottom: 10px;">- Підкреслите свою красу: Різноманіття фасонів, кольорів та візерунків дозволить вам підібрати панчохи, які підкреслять ваші ноги та доповнять ваш образ.</li><li style="margin-bottom: 10px;">- Завжди будете в тренді: Колекції RIKSI регулярно оновлюються, тому ви завжди будете в курсі останніх модних тенденцій.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте RIKSI та насолоджуйтесь бездоганним комфортом та витонченістю у кожному кроці!</p></div>' },
      { name: 'Сукні', subcategoryUrl: 'sukni', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до колекції жіночих домашніх суконь від RIKSI! Тут ви знайдете вишукані моделі, які поєднують у собі комфорт та елегантність. Кожна сукня створена з урахуванням сучасних тенденцій моди та виготовлена з матеріалів найвищої якості.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Сукні від RIKSI дозволяють відчувати себе чудово в будь-який час вдома. Вони відзначаються мʼякістю тканин та зручним кроєм, що забезпечує свободу рухів і максимальний комфорт. Наші дизайнерські рішення роблять кожну сукню унікальною, дозволяючи вам виразити свій стиль і індивідуальність навіть у домашньому одязі.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Пориньте у світ комфорту та стилю разом з RIKSI! Обирайте жіночі домашні сукні, що дарують неперевершені відчуття затишку та впевненості. Купуйте зараз і відчуйте різницю!</p></div>' },
      { name: 'Комбінезони', subcategoryUrl: 'kombinezony', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Комбінезони від RIKSI – це поєднання стилю, комфорту та якості. Ми пропонуємо широкий асортимент жіночих комбінезонів, які підкреслять вашу індивідуальність та допоможуть створити унікальний образ. У нашій колекції ви знайдете як класичні, так і трендові моделі, що відповідають останнім модним тенденціям.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Наші комбінезони виготовлені з високоякісних матеріалів, що забезпечують довговічність та комфорт під час носіння. Кожна модель ретельно продумана та виготовлена з любовʼю до деталей, щоб ви могли насолоджуватися бездоганним стилем і комфортом.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI пропонує лімітовані колекції, що гарантує ексклюзивність та унікальність вашого образу. Наші комбінезони ідеально підходять для різних подій – від повсякденного носіння до особливих моментів у вашому житті. Завдяки доступним цінам, кожна жінка може дозволити собі виглядати модно та стильно.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте комбінезони від RIKSI та відчувайте себе впевнено та привабливо кожного дня. Відкрийте для себе світ якісного жіночого одягу, який підкреслює вашу неповторність та індивідуальність.</p></div>', },
    ],
  },
  {
    name: 'Комбінезони',
    categoryUrl: 'kombinezony',
    description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Комбінезони від RIKSI – це поєднання стилю, комфорту та якості. Ми пропонуємо широкий асортимент жіночих комбінезонів, які підкреслять вашу індивідуальність та допоможуть створити унікальний образ. У нашій колекції ви знайдете як класичні, так і трендові моделі, що відповідають останнім модним тенденціям.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Наші комбінезони виготовлені з високоякісних матеріалів, що забезпечують довговічність та комфорт під час носіння. Кожна модель ретельно продумана та виготовлена з любовʼю до деталей, щоб ви могли насолоджуватися бездоганним стилем і комфортом.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI пропонує лімітовані колекції, що гарантує ексклюзивність та унікальність вашого образу. Наші комбінезони ідеально підходять для різних подій – від повсякденного носіння до особливих моментів у вашому житті. Завдяки доступним цінам, кожна жінка може дозволити собі виглядати модно та стильно.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте комбінезони від RIKSI та відчувайте себе впевнено та привабливо кожного дня. Відкрийте для себе світ якісного жіночого одягу, який підкреслює вашу неповторність та індивідуальність.</p></div>',
    subcategories: [],
  },
  {
    name: 'Купальники',
    description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">РІКСІ: Купальники, що підкреслять вашу красу</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте елегантний та унікальний купальник, який підкреслить вашу фігуру? Зараз вам сподобаються купальники від RIKSI!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI пропонує широкий вибір жіночих купальників на будь-який смак і тип фігури:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Класичні моделі: для тих, хто цінує елегантність та бездоганність.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Ультрамодні купальники: для тих, хто хоче бути в тренді.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: для тих, хто прагне ексклюзивності.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Усі купальники RIKSI виготовлені з високоякісних матеріалів, що гарантує їх довговічність, комфорт та бездоганний зовнішній вигляд.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Переваги купальників RIKSI:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Підкреслюють переваги фігури</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Забезпечують ідеальну посадку</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Виготовлені з якісних матеріалів</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильні та модні</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З РІКСІ ви завжди будете виглядати неперевершено на пляжі!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе світ якісного жіночого пляжного одягу від RIKSI та підкресліть свою красу та індивідуальність!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Завітайте на сайт RIKSI та оберіть купальник своєї мрії!</p></div>',
    categoryUrl: 'kupalnyky',
    subcategories: [],
  },
  {
    name: 'Спортивний одяг та білизна',
    categoryUrl: 'sportyvnyi-odiah-ta-bilyzna',
    description: '<div class="text"><p style="text-align: justify;">RIKSI — це український бренд, що втілює в собі якість та стиль у спортивному одязі та білизні для сучасних жінок. Наш асортимент включає лонгсліви, майки, топи, трусики, велосипедки, пояси та інше. Ми прагнемо поєднати якість та стиль, пропонуючи клієнтам доступні ціни та лімітовані колекції.</p><br /><p style="text-align: justify;">З RIKSI Ви можете підібрати стильний та комфортний спортивний образ. Нова колекція спортивного одягу має відповідати останнім трендам у жіночій моді. Обирайте улюблені речі та створюйте особливий образ разом з RIKSI.</p></div>',
    subcategories: [
      { name: 'Лонгсліви', subcategoryUrl: 'lonhslivy', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Лонгсліви RIKSI - це не лише одяг, але й вираз вашого стилю та активного способу життя. Наші моделі створені з урахуванням потреб сучасної жінки, яка цінує комфорт, якість та стиль.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з високоякісних матеріалів, наші лонгсліви забезпечують оптимальну теплоізоляцію та вентиляцію, що робить їх ідеальними для активного використання у будь-яку пору року. Ви можете впевнено носити їх під час занять спортом, прогулянок або повсякденних справ, завжди виглядаючи стильно та елегантно.</p><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 1px;">Обирайте лонгсліви від RIKSI та додайте свій активний штрих до свого образу. Наші моделі стануть вірним помічником у вашому повсякденному житті, даруючи вам зручність та впевненість у кожному русі.</p></div>' },
      { name: 'Майки', subcategoryUrl: 'maiky', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Майки RIKSI - це не просто одяг, це частина вашого активного стилю життя. Наші моделі створені з урахуванням потреб сучасної жінки, яка цінує якість, комфорт та стиль.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з високоякісних матеріалів, наші майки забезпечують відмінну вентиляцію та комфорт під час будь-яких активностей. Вони ідеально підходять як для спортивних занять, так і для повсякденного носіння, завдяки своєму стильному дизайну та практичності.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333;">Обирайте майки від RIKSI та додайте свій активний стиль життя до свого образу. Наші моделі стануть невідʼємною частиною вашого гардеробу, надійною підтримкою у вашому активному житті.</p></div>' },
      { name: 'Топи', subcategoryUrl: 'topy', isActive: true, description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Топи RIKSI - це не просто одяг, це вираз вашого стилю та активного способу життя. Наші моделі створені з урахуванням потреб сучасної жінки, яка цінує комфорт, якість та стиль.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з високоякісних матеріалів, наші топи забезпечують відмінну вентиляцію та комфорт під час будь-яких активностей. Вони ідеально підходять як для спортивних занять, так і для повсякденного носіння, завдяки своєму стильному дизайну та практичності.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0px;">Обирайте топи від RIKSI та додайте свій активний стиль до свого образу. Наші моделі стануть невідʼємною частиною вашого гардероба, надійною підтримкою у вашому активному житті.</p>' },
      { name: 'Трусики', subcategoryUrl: 'trusyky', isActive: true, description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Спортивні трусики RIKSI - це ваш найкращий вибір для активного способу життя. Наші моделі розроблені з урахуванням потреб сучасної жінки, яка цінує комфорт та стиль навіть під час тренувань.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з дихаючих матеріалів, наші спортивні трусики забезпечують максимальний комфорт та вентиляцію під час фізичних навантажень. Зручна посадка та стильний дизайн дозволять вам відчувати себе впевнено та стильно в будь-яку мить.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0px;">Оберіть спортивні трусики від RIKSI та насолоджуйтесь активним життям з комфортом та елегантністю. Наші моделі допоможуть вам досягти максимальних результатів у спорті, забезпечуючи при цьому максимальний комфорт та відчуття впевненості.</p>', },
      { name: 'Велосипедки', subcategoryUrl: 'velosypedky', isActive: true, description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Велосипедки RIKSI - ідеальний вибір для жінок, які цінують комфорт та стиль під час велосипедних пригод. Наші шорти розроблені з урахуванням потреб активних жінок, які люблять тренуватися та відчувати себе впевнено на дорозі.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з високоякісних та дихаючих матеріалів, наші велосипедки забезпечують оптимальний комфорт та вентиляцію під час велопрогулянок. Зручна посадка та стильний дизайн допоможуть вам виглядати елегантно та модно в будь-яку мить.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0px;">Оберіть велосипедки від RIKSI та насолоджуйтесь активними пригодами з комфортом та елегантністю. Наші моделі допоможуть вам насолоджуватися кожним моментом на дорозі, забезпечуючи максимальний комфорт та відчуття впевненості.</p>', },
      { name: 'Пояси', subcategoryUrl: 'poiasy', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте спортивний пояс, який забезпечить вам максимальний комфорт та підтримку під час тренувань? RIKSI - це те, що вам потрібно!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ми пропонуємо широкий асортимент спортивних поясів для жінок, розроблених з урахуванням потреб активних людей.</p><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">Наші спортивні пояси:</p><ul style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; padding-left: 20px;"><li style="margin-bottom: 10px;">- Виготовлені з високоякісних та дихаючих матеріалів, які забезпечують комфорт та відведення вологи під час тренувань.</li><li style="margin-bottom: 10px;">- Мають зручну посадку, яка не обмежує рухів.</li><li style="margin-bottom: 10px;">- Стильний дизайн допоможе вам відчувати себе впевнено та стильно під час будь-якого тренування.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте спортивні пояси RIKSI та насолоджуйтесь тренуваннями без обмежень!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Досягайте своїх цілей з комфортом та підтримкою!</p></div>' },
    ],
  },
  {
    name: 'Аксесуари',
    categoryUrl: 'aksesuary',
    description: '<div class="text"><p style="text-align: justify;">Аксесуари від RIKSI - це ключові деталі, які надаються вам у формі неповторного шарму та вишуканості. У нашому асортименті елегантні рукавички, стильні панчохи, вишукані гартерії та модні пояси — кожен предмет допоможе створити образ, який виділить Вас із натовпом.</p><br /><p style="text-align: justify;">Рукавички від RIKSI надають вашому вигляду вишуканість та елегантність, панчохи створюють чуттєву атмосферу та привабливість, гартері вносять нотку сексуальності, а пояси завершують образ, підкреслюючи вашу фігуру та стиль.</p><br /><p style="text-align: justify;">Завдяки високій якості матеріалів та стильному дизайну, аксесуари від RIKSI залишаться лише прикрашеними Вашим виглядом, а й практичним елементом Вашого гардеробу. Насолоджуйтесь вибором і додайте шарму вашого стилю з аксесуарами від RIKSI.</p></div>',
    subcategories: [
      { name: 'Панчохи', subcategoryUrl: 'panchokhy' },
      { name: 'Рукавички', subcategoryUrl: 'rukavychky', isActive: true, description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте вишукані рукавички, які стануть родзинкою вашого образу? RIKSI пропонує саме те, що вам потрібно!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ми створюємо унікальні рукавички з сітки, які не лише доповнять ваш стиль, але й підкреслять вашу красу та жіночність.</p><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">Наші рукавички:</p><ul style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; padding-left: 20px;"><li style="margin-bottom: 10px;">- виготовлені з високоякісної сітки, яка приємна на дотик та комфортна у носінні;</li><li style="margin-bottom: 10px;">- стануть чудовим доповненням до наших комплектів білизни.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Це аксесуар, який підкреслить вашу індивідуальність та зробить вас неперевершеною.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе світ RIKSI та знайдіть свою ідеальну пару рукавичок!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З RIKSI ваша краса сяятиме ще яскравіше!</p></div>' },
      { name: 'Гартери', subcategoryUrl: 'hartery', description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до категорії гартерів RIKSI, де елегантність та спокусливість поєднуються у витончених аксесуарах для жінок.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Наші жіночі гартери — це символ жіночності та витонченого стилю. Виготовлені з високоякісних матеріалів, наші гартери додадуть вашому образу неповторного шарму та вишуканості.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе асортимент гартерів RIKSI. З нами ваш образ завжди буде особливим, а відчуття — незабутніми.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Незалежно від того, чи шукаєте ви гартери для особливого випадку чи для того, щоб підкреслити свою жіночність у повсякденному житті, в нашому магазині ви знайдете те, що потрібно саме вам.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333;">Завітайте до RIKSI та насолоджуйтесь найкращими аксесуарами.</p>' },
      { name: 'Пояси', subcategoryUrl: 'poyasy', description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до категорії поясів для жіночої білизни від RIKSI, де стиль поєднується з елегантністю в кожному аксесуарі. Наші пояси — це не лише функціональний елемент, але й важлива деталь вашого образу, яка підкреслює вашу жіночність та стиль.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Кожен пояс RIKSI - це не лише аксесуар, але й вираз вашої особистості. Додайте елегантності та стилю до свого гардероба з нашими поясами для білизни.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333;">Завітайте до нашого магазину та оберіть ідеальний пояс, який відповідає вашому смаку та стилю.</p>' },
    ],
  },
  {
    name: 'Сертифікати',
    description: '<div class="text"><p style="text-align: justify;">Подарунковий сертифікат від RIKSI – це ідеальний варіант, коли ви не можете визначитися, що саме подарувати вашій коханій чи подрузі. За допомогою нашого сертифіката Ви даруєте не лише предмети одягу, а й можливість вибору, адже вона сама зможе обрати щось, що відповідає її стилю та перевагам.</p><p style="text-align: justify;">Наші подарункові сертифікати доступні як у формі електронного документа, так і у вигляді стильного фізичного сертифіката, який можна вручити особисто. Вибір залишається за вами, адже ми прагнемо зробити Ваш подарунок максимально зручним та приємним.</p><p style="text-align: justify;">Подарунковий сертифікат від RIKSI - це можливість отримати щось особливе та якісне, обравши самій те, що подобається. Зробіть свій подарунок ще більш запамʼятовуваним та цінним, обираючи подарунковий сертифікат від RIKSI.</p></div>',
    categoryUrl: 'sertyfikaty',
    subcategories: [],
  },
];

const sliderImages = [
  {
    imageUrl: 'https://riksi.ua/content/images/7/1440x576e90nn0/46132421340665.webp',
    link: 'http://localhost:3000/catalog/body',
    altText: 'Колекція PRE-WINTERʼ25 від RIKSI',
    isMobile: false,
    isActive: true,
    position: 1,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/12/1440x576e90nn0/41800258047833.webp',
    link: 'http://localhost:3000/umovy-uchasti-v-rozihrashi',
    altText: 'RIKSI Shopping',
    isMobile: false,
    isActive: true,
    position: 2,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/34/1440x576e90nn0/28681354717475.webp',
    link: 'http://localhost:3000/catalog/domashniy-odiah',
    altText: 'Колекція NEW-YEARʼ25 від RIKSI',
    isMobile: false,
    isActive: true,
    position: 3,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/17/640x800e90nn0/73852982768550.webp',
    altText: 'RIKSI',
    position: 1,
    isMobile: true,
    isActive: true,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/24/640x800e80nn0/55459669888553.webp',
    altText: 'Riksi',
    position: 2,
    isMobile: true,
    isActive: true,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/46/640x800e80nn0/98991891637710.webp',
    altText: 'Riksi',
    position: 3,
    isMobile: true,
    isActive: true,
  }
];

const bannerImages = [
  {
    imageUrl: 'https://riksi.ua/content/images/33/720x432e90nn0/24857368472573.webp',
    link: 'catalog/domashniy-odiah',
    isActive: true,
    isMobile: false,
    altText: 'Pajamas Banner',
    position: 1,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/34/720x432e90nn0/63711780951309.webp',
    link: 'catalog/bilyzna',
    isActive: true,
    isMobile: false,
    altText: 'Body Suit Banner',
    position: 2,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/33/1280x1280e80nn0/12701472551900.webp',
    link: 'catalog/bilyzna',
    isActive: true,
    isMobile: true,
    altText: 'RIKSI Lingerie Banner',
    position: 1,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/19/1280x1280e80nn0/53409880640409.webp',
    link: 'catalog/domashniy-odiah',
    isActive: true,
    isMobile: true,
    altText: 'RIKSI Home Clothes Banner',
    position: 2,
  },
];

const bottomBannerImage = [
  {
    imageUrl: 'https://riksi.ua/content/images/40/1440x216e90nn0/51054835940617.webp',
    altText: 'Price Party Bottom Banner',
    link: 'http://localhost:3000/catalog/price-party',
    position: 1,
    isActive: false
  }
];

const users = [
  {
    fullName: 'Riksi Admin',
    email: 'riksi.factory@gmail.com',
    password: hashSync('riksiadmin12345', 10),
    verified: new Date(),
    role: UserRole.ADMIN
  }
];

const footerPages = [
  {
    title: 'Про нас',
    secondTitle: 'Підкресліть свою красу з українським брендом RIKSI',
    footerUrl: 'pro-nas',
    content: '<strong>RIKSI</strong> - український бренд спідньої жіночої білизни, боді, купальників та домашнього одягу, який заснований у 2020 році.  Маючи власне виробництво, ми створюємо унікальні колекції, які крокують у ногу з модними тенденціями та трендами. Для кожної моделі ми підбираємо тільки найкращі матеріали та найактуальніші кольори, щоб кожна дівчина або жінка виглядала яскраво і ловила на собі тисячі захоплених поглядів, а вдома тішилася своїми неповторними та грайливими образами, не забуваючи про комфорт у кожному русі.',
    isActive: true
  },
  {
    title: 'Гарантія',
    secondTitle: 'Гарантія на продукцію RIKSI',
    footerUrl: 'garantiya',
    content: 'Гарантія діє на всі види товарів 30 днів з моменту придбання. Відповідаємо за якість власних виробів і зобовʼязуємося робити обмін або повернення у разі виявлення виробничого браку.',
    isActive: true
  },
  {
    title: 'Обмін та повернення',
    secondTitle: 'Обмін та повернення продукції RIKSI',
    footerUrl: 'obmin-ta-povernennya',
    content: 'Товар можна обміняти чи повернути упродовж 14 днів з моменту отримання замовлення, якщо збережено товарний вигляд. <br> <br> Відповідно до Закону України "Про захист прав споживачів" спідня білизна відноситься до категорії товарів, що не підлягають обміну та поверненню, окрім випадків виробничого браку. Але, ми <strong> йдемо на назустріч нашим клієнтам </strong> і допускаємо повернення та обмін замовлення спідньої білизни. Обміняти її можна протягом 3 днів з моменту отримання. <br> <br> Ми ретельно перевіряємо одяг та білизну при обміні чи поверненні. У разі, якщо будуть помічені ознаки носіння, забруднення, пошкодження, відривання ярликів, то ми у праві відмовити Вам у Вашому проханні. <br> <br> Строки повернення коштів складають 1-3 робочих дні.',
    isActive: true
  },
  {
    title: 'Оплата і доставка',
    secondTitle: 'Оплата і доставка продукції RIKSI',
    footerUrl: 'oplata-i-dostavka',
    content: '<strong>Післяплата:</strong> <br> <br> Товар передається до поштового відділення після частокової оплати у розмірі 200 грн у якості доказу Вашої зацікавленості у покупці. Решту частину коштів сплачуєте у відділенні пошти. <br> <br> <strong>Передплата:</strong> <br> <br> <strong> Оплата замовлень по Україні: </strong> <br> <br> - Через WayForPay; <br> <br> - На карту ФОП;<br> <br> - За реквізитами IBAN; <br> <br> - Накладений платіж. <br> <br> <strong>Оплата для міжнародних замовлень:</strong> <br> <br> - Через WayForPay. <br> <br> <strong>Оплата частинами: </strong> <br> <br> - «Посилка в кредит» від Нової пошти. <br> <br> Укрпоштою по Україні та закордон за тарифами перевізників. <br> <br> При замовленні від 4000 грн доставка по Україні безкоштовно. <br> <br> <strong> Увага!</strong> Колір товару на фото може відрізнятися від реального, оскільки це повʼязано з особливостями кольорових відтінків дисплея Вашого телефону, налаштуваннями фотокамери або ж іншими факторами. <br> <br> Під час пакування товару ми ретельно перевіряємо річ на предмет браку та на якість самої упаковки. Усі товари передаються до перевізника упаковані належним чином. Ми не несемо відповідальності за збереження пакування при транспортуванні. У разі пошкодження пакування, будь ласка, звертайтеся до перевізника, оскільки компанія перевізник несе відповідальність за належне транспортування посилок.',
    isActive: true
  },
  {
    title: 'Угода користувача',
    secondTitle: '',
    footerUrl: 'privacypolicy',
    content: "",
    isActive: true
  },
  {
    title: 'Публічний договір',
    secondTitle: '',
    footerUrl: 'publichnyi-dohovir',
    content: '',
    isActive: true
  },
]

async function seed() {
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        verified: user.verified,
        role: user.role
      }
    })
    console.log(`Created user: ${createdUser.fullName}`)
  }
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        categoryUrl: category.categoryUrl,  // додаємо categoryUrl
        description: category.description,
        isActive: category.isActive || true,  // додаємо isActive з дефолтним значенням true
        subcategories: {
          create: category.subcategories.map(subcategory => ({
            name: subcategory.name,
            subcategoryUrl: subcategory.subcategoryUrl,  // додаємо subcategoryUrl
            description: subcategory.description,
            isActive: subcategory.isActive || true,  // додаємо isActive з дефолтним значенням true
          })),
        },
      },
    });

  }

  for(const footerPage of footerPages) {
    const createdFooterPage = await prisma.footerPage.create({
      data: {
        title: footerPage.title,
        secondTitle: footerPage.secondTitle,
        footerUrl: footerPage.footerUrl,
        content: footerPage.content,
        isActive: footerPage.isActive
      }
    })
    console.log(`Created footer page: ${createdFooterPage.title}`)
  }

  for (const sliderImage of sliderImages) {
    const createdSliderImage = await prisma.sliderImage.create({
      data: {
        imageUrl: sliderImage.imageUrl,
        name: sliderImage.altText,
        altText: sliderImage.altText,
        link: sliderImage.link,
        position: sliderImage.position,
        isMobile: sliderImage.isMobile,
        isActive: sliderImage.isActive
      },
    });

    console.log(`Created slider image: ${createdSliderImage.altText}`);
  }

  for (const bannerImage of bannerImages) {
    const createdBannerImage = await prisma.bannerImage.create({
      data: {
        name: bannerImage.altText,
        imageUrl: bannerImage.imageUrl,
        altText: bannerImage.altText,
        link: bannerImage.link,
        isActive: bannerImage.isActive,
        isMobile: bannerImage.isMobile,
        position: bannerImage.position,
      },
    });

    console.log(`Created slider image: ${createdBannerImage.altText}`);
  }

  for(const BottomBannerImage of bottomBannerImage) {
    const createdBottomBannerImage = await prisma.bottomBannerImage.create({
      data: {
        imageUrl: BottomBannerImage.imageUrl,
        altText: BottomBannerImage.altText,
        position: BottomBannerImage.position,
        link: BottomBannerImage.link,
        isActive: BottomBannerImage.isActive
      }
    })
    console.log(`Created bottom banner image: ${createdBottomBannerImage.altText}`)
  }

}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Subcategory" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "SliderImage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "BannerImage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "BottomBannerImage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "FooterPage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductComplect" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "PromoCode" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await seed();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
