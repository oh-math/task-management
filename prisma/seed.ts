import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/common/utils/password-hashing';

const logger = new Logger('seed');
const prisma = new PrismaClient();

async function main() {
  const password = '1234';
  const hashedPassword = await hashPassword(password);
  const expiration_date = new Date();
  const mainUser = await prisma.user.create({
    data: {
      name: 'Matheus',
      password: hashedPassword,
      email: 'matheus_test@uol.com',
    },
  });

  const { user_id } = mainUser;

  const posts = await prisma.task.createMany({
    data: [
      {
        name: 'Criar Rotas',
        description: 'Criar Rotas - CRUD',
        expiration_date,
        user_id,
      },
      {
        name: 'Node Streams',
        description: 'Como funcionam as Node Streams',
        expiration_date,
        user_id,
      },
      {
        name: 'NextJS',
        description: 'Fundamentos do NextJS',
        expiration_date,
        user_id,
      },
      {
        name: 'Bash vs Zsh',
        description: 'Qual terminal é melhor',
        expiration_date,
        user_id,
      },
      {
        name: 'Java e a JVM',
        description:
          'Entendendo como o java conta para seu PC o que você quer fazer',
        expiration_date,
        user_id,
      },
      {
        name: 'Https',
        description: 'O básico sobre HTTP e seu S',
        expiration_date,
        user_id,
      },
      {
        name: 'Kubernetes',
        description: 'Como o kubernetes finalmente funciona',
        expiration_date,
        user_id,
      },
    ],
  });

  if (posts) {
    logger.log('Databased seeded with sucess!');
  } else {
    logger.error('An error ocurred when seeding your database');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
