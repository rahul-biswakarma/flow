'use server';

import { auth } from '../utils/auth';
import { prisma } from '../utils/db';

export const createProject = async (prevState: any, formData: FormData) => {
  const name = formData.get('project-name') as string;
  const slug = formData.get('project-slug') as string;

  console.log('formData', formData);

  const session = await auth();

  await prisma.project.create({
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
