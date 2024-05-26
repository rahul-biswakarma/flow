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

  const invitations = {};

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-full max-w-[600px] flex-col justify-center gap-10">
        <OnboardingSectionContainer {...{ projects, invitations }} />
      </div>
    </div>
  );
};
