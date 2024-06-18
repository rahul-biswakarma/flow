'use client';

import { Prisma, Project } from '@prisma/client';
import { useState } from 'react';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

import { CreateProject } from './sections/create-project';
import { SelectInvitation } from './sections/select-invitation';
import { SelectProject } from './sections/select-project';
import { ProjectSections } from './type';

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
          <Flex align="center" direction="column" gap="1">
            <Button
              style={{
                width: '100%',
              }}
              onClick={() => changeSection('creation')}
            >
              <PlusIcon />
              <Text>Create Project</Text>
            </Button>
            <Text
              size="1"
              style={{
                color: 'var(--gray-10)',
              }}
            >
              Create your own workspace and invite others to collaborate
            </Text>
          </Flex>
        </Flex>
      )}

      {section === 'creation' && <CreateProject changeSection={changeSection} />}
    </>
  );
};
