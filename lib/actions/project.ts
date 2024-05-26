import { auth } from '../utils/auth';
import { prisma } from '../utils/db';

export const createProject = async (name: string, slug: string) => {
  'use server';
  const session = await auth();

  prisma.project.create({
    data: {
      name,
      slug,
      projectMembers: {
        create: {
          userId: session.user.id,
        },
      },
    },
  });
};
