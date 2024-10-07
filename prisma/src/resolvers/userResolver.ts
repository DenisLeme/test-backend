import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userResolver = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
  },
};
