import { prisma } from "./src/lib/prisma.js";

async function main() {
  const levels = await prisma.level.findMany({
    include: {
      positions: {
        select: { character: { select: { name: true, imageUrl: true } } },
      },
    },
    orderBy: { name: "waldo" },
  });

  console.log(JSON.stringify(levels));
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
