import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  console.log('Memulai seeding ...');
  await prisma.user.deleteMany();
  await prisma.mahasiswa.deleteMany();
  await prisma.mahasiswa.create({
    data: {
      NIM: 24121026,
      name: 'Muhammad Murtadlo',
      phone: '082146796695',
    },
  });
  await prisma.user.create({
    data: {
      role: 'admin',
      password: process.env.PASSWORD_SEEDER,
      usernameByNIM: 24121026,
      name: 'Muhammad Murtadlo',
    },
  });
  console.log('Seeding selesai!');
}
main().then(async () => await prisma.$disconnect());
