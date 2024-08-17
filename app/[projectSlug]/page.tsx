import { Product } from '@/libs/components';
import { Onboarding } from '@/libs/components/onboarding/onboarding';
import { PreviewContextProvider, ProjectContextProvider } from '@/libs/context';
import { auth } from '@/libs/utils/auth';
import { prisma } from '@/libs/utils/db';
import { LoginRedirect } from '@/libs/utils/redirects';

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
      pages: {
        include: {
          seo: true,
        },
      },
    },
  });

  if (!project) {
    return <Onboarding userId={userId} />;
  }

  return (
    <ProjectContextProvider projectWithPages={project}>
      <PreviewContextProvider>
        <Product />
      </PreviewContextProvider>
    </ProjectContextProvider>
  );
}
