import { Project } from '@prisma/client';

import { ProjectCard } from '../project-card';

type SelectProjectProps = {
  projects: Project[];
};

export const SelectProject = ({ projects }: SelectProjectProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span>
        <h3>Active Projects</h3>
        <p>Your current workspaces where you can collaborate and contribute.</p>
      </span>
      <ul className="flex flex-col gap-2">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};
