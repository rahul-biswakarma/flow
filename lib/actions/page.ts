'use server';

import { prisma } from '../utils/db';

export const createPage = async (pageName: string, projectId: string) => {
  await prisma.page.create({
    data: {
      name: pageName,
      config: '{}',
      project: {
        connect: {
          id: projectId,
        },
      },
    },
  });
};
