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

export const updatePageData = async (pageId: string, data: string) => {
  await prisma.page.update({
    where: { id: pageId },
    data: { config: data },
  });
};
