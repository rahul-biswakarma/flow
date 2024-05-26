import { Onboarding } from '@/lib/components/onboarding/onboarding';
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
    return <Onboarding userId={userId} />;
  }

  return <div className="flex gap-x-10">{project.name}</div>;
}
