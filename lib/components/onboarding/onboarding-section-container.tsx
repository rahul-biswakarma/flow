'use client';

import { Project } from '@prisma/client';
import { useState } from 'react';

import { Button } from '../ui/button';

import { CreateProject } from './sections/create-project';
import { SelectInvitation } from './sections/select-invitation';
import { SelectProject } from './sections/select-project';

type OnboardingSectionContainerProps = {
  projects: Project[];
  invitations: Project[];
};

export enum ProjectSections {
  Selection,
  Creation,
}

export const OnboardingSectionContainer = ({ projects, invitations }: OnboardingSectionContainerProps) => {
  const [section, setSection] = useState(ProjectSections.Selection);

  const changeSection = (section: ProjectSections) => {
    setSection(section);
  };

  return (
    <>
      {section === ProjectSections.Selection && (
        <div className="flex flex-col gap-10">
          <SelectProject projects={projects} />
          {invitations && invitations.length && <SelectInvitation invitations={invitations} />}
          <Button onClick={() => changeSection(ProjectSections.Creation)}>Create Project</Button>
        </div>
      )}

      {section === ProjectSections.Creation && <CreateProject changeSection={changeSection} />}
    </>
  );
};
