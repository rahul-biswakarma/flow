'use client';

import { Prisma, Project } from '@prisma/client';
import { useState } from 'react';
import { Flex, Heading } from '@radix-ui/themes';

import { CreateProject } from './sections/create-project';
import { SelectInvitation } from './sections/select-invitation';
import { SelectProject } from './sections/select-project';
import { CreateProjectButton } from './create-project-button';

import { ProjectSections } from '@/libs/types';

type OnboardingSectionContainerProps = {
  projects: Project[];
  invitations: Prisma.InvitationGetPayload<{
    include: {
      project: true;
    };
  }>[];
};

export const OnboardingSectionContainer = ({ projects, invitations }: OnboardingSectionContainerProps) => {
  const [section, setSection] = useState<ProjectSections>('selection');

  const changeSection = (section: ProjectSections) => {
    setSection(section);
  };

  const isInvitationPresent = invitations?.length > 0;

  return (
    <>
      {section === 'selection' && (
        <Flex direction="column" gap="7">
          <Heading as="h1">Select Project</Heading>
          <SelectProject projects={projects} />
          {isInvitationPresent && <SelectInvitation invitations={invitations} />}
          <CreateProjectButton changeSection={changeSection} />
        </Flex>
      )}

      {section === 'creation' && <CreateProject changeSection={changeSection} />}
    </>
  );
};
