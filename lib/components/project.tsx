import { Page, Project } from '@prisma/client';

import { LeftPanel } from './left-panel';

type ProjectWithPages = Project & {
  pages: Page[];
};

export const Product = ({ project }: { project: ProjectWithPages }) => {
  return (
    <div className="flex h-full w-full">
      <LeftPanel pages={project.pages ?? []} />
      <div>Hello</div>
    </div>
  );
};
