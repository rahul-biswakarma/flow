import { Container } from '@radix-ui/themes';
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
    <Container align="center" size="2">
      <OnboardingSectionContainer {...{ projects, invitations }} />
    </Container>
  );
};
