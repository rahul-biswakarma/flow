'use server';

import { defaultProjectConfig } from '../constants';
import { auth } from '../utils/auth';
import { prisma } from '../utils/db';

export const createProject = async (prevState: any, formData: FormData) => {
  const name = formData.get('project-name') as string;
  const slug = formData.get('project-slug') as string;

  const session = await auth();

  const project = await prisma.project.create({
    data: {
      name,
      slug,
      projectMembers: {
        create: {
          userId: session.user.id,
        },
      },
      pages: {
        create: {
          name: 'home',
          config: JSON.stringify(defaultProjectConfig),
          path: '/',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });

  return project;
};
