import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
