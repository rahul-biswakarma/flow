'use client';

import { useActionState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import { createProject } from '@/lib/actions';

export const CreateProject = () => {
  const [state, formAction] = useActionState(createProject, null);

  return (
    <div className="flex flex-col gap-4">
      <form action={formAction}>
        <span>
          <Label htmlFor="project-name">Project Name</Label>
          <Input required id="project-name" name="project-name" type="text" />
        </span>
        <span>
          <Label htmlFor="project-slug">Project Slug</Label>
          <Input required id="project-slug" name="project-slug" type="text" />
        </span>
        <Button type="submit" variant="default">
          Create
        </Button>
      </form>
    </div>
  );
};
