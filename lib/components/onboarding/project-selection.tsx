import { CreateProject } from './create-project';

import { prisma } from '@/lib/utils/db';

export const ProjectSelection = async ({ userId }: { userId: string }) => {
  const projects = await prisma.project.findMany({
    where: {
      projectMembers: {
        some: {
          userId,
        },
      },
    },
  });

  return (
    <div>
      <h3>Active Projects</h3>
      <p>Your current workspaces where you can collaborate and contribute.</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a href={`/${project.slug}`}>{project.name}</a>
          </li>
        ))}
      </ul>
      <CreateProject />
    </div>
  );
};
