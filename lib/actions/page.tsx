import { auth } from '../utils/auth';
import { prisma } from '../utils/db';

export const createPage = async (name: string) => {
  'use server';
  const session = await auth();

  prisma.page.create({
    data: {
      name,
      config: '{}',
      project: {
        connect: {
          id: session.project.id,
        },
      },
    },
  });
};
