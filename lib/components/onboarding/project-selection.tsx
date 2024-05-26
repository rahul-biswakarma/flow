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
    <div className="flex h-full items-center justify-center">
      <div className="flex max-w-[600px] flex-col justify-center gap-10">
        <div className="flex flex-col gap-4">
          <span>
            <h3>Active Projects</h3>
            <p>Your current workspaces where you can collaborate and contribute.</p>
          </span>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <a href={`/${project.slug}`}>{project.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <CreateProject />
      </div>
    </div>
  );
};
