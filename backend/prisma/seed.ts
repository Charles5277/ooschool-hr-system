import { PrismaClient } from '@prisma/client';
export * from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

async function main() {
  // 建立新的table為employees
  const defaultEmployee = await prisma.employees.create({
    where: { emp_id: 'A0000' },
    update: {},
    create: {
      emp_id: 'A0000',
      emp_name: 'John',
    },
  });
  console.log({ defaultEmployee });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
