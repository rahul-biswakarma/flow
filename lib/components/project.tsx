import { Page, Project } from '@prisma/client';

import { LeftPanel } from './left-panel';

type ProjectWithPages = Project & {
  pages: Page[];
};

export const Product = ({ project }: { project: ProjectWithPages }) => {
  return (
    <div>
      <LeftPanel pages={project.pages ?? []} />
    </div>
  );
};
