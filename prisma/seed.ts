import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está configurada");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await hash("Marketplace123", 12);

  const user = await prisma.user.upsert({
    where: {
      email: "demo@marketplace.com",
    },
    update: {
      passwordHash,
    },
    create: {
      email: "demo@marketplace.com",
      passwordHash,
    },
  });

  console.log(`Usuario preparado: ${user.email}`);
}

main()
  .catch((error: unknown) => {
    console.error("Error ejecutando el seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });