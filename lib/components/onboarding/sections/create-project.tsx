'use client';

import { useActionState } from 'react';

import { ProjectSections } from '../onboarding-section-container';

import { createProject } from '@/lib/actions';
import { ProjectRedirect } from '@/lib/utils/redirects';

type CreateProjectProps = {
  changeSection: (section: ProjectSections) => void;
};

export const CreateProject = ({ changeSection }: CreateProjectProps) => {
  const [state, formAction] = useActionState(createProject, null);

  if (state && state.slug) {
    ProjectRedirect(state.slug);
  }

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-4">
        <span>
          <Label htmlFor="project-name">Project Name</Label>
          <Input required id="project-name" name="project-name" placeholder="Project name" type="text" />
        </span>
        <span>
          <Label htmlFor="project-slug">Project Slug</Label>
          <Input required id="project-slug" name="project-slug" placeholder="project-name" type="text" />
        </span>
        <Button type="submit" variant="default">
          Create
        </Button>
      </form>
    </div>
  );
};
