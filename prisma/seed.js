const { PrismaClient } = require('@prisma/client/.prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Create a couple of users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
    },
  });
  console.log(`Created user with id: ${user1.id}`);

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
    },
  });
  console.log(`Created user with id: ${user2.id}`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
