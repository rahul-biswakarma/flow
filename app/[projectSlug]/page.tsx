import { Flex } from '@radix-ui/themes';

import { Product } from '@/lib/components';
import { Onboarding } from '@/lib/components/onboarding/onboarding';
import { ProjectContextProvider } from '@/lib/context';
import { auth } from '@/lib/utils/auth';
import { prisma } from '@/lib/utils/db';
import { LoginRedirect } from '@/lib/utils/redirects';

export default async function Project({ params }: { params: { projectSlug: string } }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user?.id) {
    LoginRedirect();
  }

  const project = await prisma.project.findUnique({
    where: {
      slug: params.projectSlug,
      projectMembers: {
        some: {
          userId,
        },
      },
    },
    include: {
      pages: true,
    },
  });

  if (!project) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{
          minHeight: '100vh',
        }}
      >
        <Onboarding userId={userId} />
      </Flex>
    );
  }

  return (
    <ProjectContextProvider projectWithPages={project}>
      <Product />
    </ProjectContextProvider>
  );
}
