import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.paymentDetails.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      cardKey: '4239220036575123',
      iban: 'UA903003350000000026001751497',
      edrpou: '2268122477',
      fopName: 'ФОП Коваль Віктор Анатолійович',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
