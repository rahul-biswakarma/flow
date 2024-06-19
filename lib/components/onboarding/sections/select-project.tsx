import { Project } from '@prisma/client';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';

import { ProjectCard } from '../project-card';
import { DecorativeBox } from '../../ui/decorative-box';

type SelectProjectProps = {
  projects: Project[];
};

export const SelectProject = ({ projects }: SelectProjectProps) => {
  return (
    <Flex direction="column" gap="2">
      <Box>
        <Heading
          as="h3"
          size="3"
          style={{
            color: 'var(--gray-11)',
          }}
        >
          Active Projects
        </Heading>
        <Text
          size="2"
          style={{
            color: 'var(--gray-10)',
          }}
        >
          Your current workspaces where you can collaborate and contribute.
        </Text>
      </Box>
      <Flex direction="column" gap="2">
        {projects.length === 0 && (
          <DecorativeBox
            messageRenderer={
              <Text
                size="1"
                style={{
                  fontSize: '12px',
                  color: 'var(--gray-10)',
                }}
              >
                No active projects
              </Text>
            }
            style={{
              height: '100px',
            }}
          />
        )}
        {projects.map((project) => (
          <ProjectCard key={`selection-card-${project.id}}`} project={project} />
        ))}
      </Flex>
    </Flex>
  );
};
