import { Container, Flex } from '@radix-ui/themes';
import { Prisma } from '@prisma/client';

import { OnboardingSectionContainer } from './onboarding-section-container';

import { prisma } from '@/lib/utils/db';

export const Onboarding = async ({ userId }: { userId: string }) => {
  const projects = await prisma.project.findMany({
    where: {
      projectMembers: {
        some: {
          userId,
        },
      },
    },
  });

  const invitations: Prisma.InvitationGetPayload<{
    include: {
      project: true;
    };
  }>[] = [];

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: '100vh',
      }}
    >
      <Container align="center" size="2">
        <OnboardingSectionContainer {...{ projects, invitations }} />
      </Container>
    </Flex>
  );
};
