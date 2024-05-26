import { Project } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <a href={`/${project.slug}`}>
      <div className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="flex flex-col">
          <Label>{project.name}</Label>
          <span>{project.slug}</span>
        </span>
      </div>
    </a>
  );
};
