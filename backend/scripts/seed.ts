import prisma from "../src/config/prisma";
import bcrypt from "bcrypt";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@centrocultural.local",
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(
    "TroqueDepois123!",
    10
  );

  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@centrocultural.local",
      passwordHash,
      role: "admin",
    },
  });

  console.log("Admin created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });