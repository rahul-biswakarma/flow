import { Project } from '@prisma/client';
import { Avatar, Box, Card, Flex, IconButton, Text } from '@radix-ui/themes';
import { IconArrowRight } from '@tabler/icons-react';

import styles from '@/libs/styles/onboarding.module.css';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Box className={styles.onboardingProjectCard}>
      <Card asChild>
        <a href={`/${project.slug}`}>
          <Flex align="center" gap="2" justify="between">
            <Flex align="center" gap="2">
              <Avatar fallback="CN" size="3" src="https://github.com/shadcn.png" />
              <Flex direction="column" gap="0">
                <Text style={{}}>{project.name}</Text>
                <Text
                  style={{
                    marginTop: '-3px',
                    color: 'var(--gray-10)',
                  }}
                >
                  {project.slug}
                </Text>
              </Flex>
            </Flex>
            <IconButton className={styles.projectCardIconButton} size="2" variant="ghost">
              <IconArrowRight size="16px" />
            </IconButton>
          </Flex>
        </a>
      </Card>
    </Box>
  );
};
