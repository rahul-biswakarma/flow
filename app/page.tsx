import { auth } from '@/lib/utils/auth';
import { LoginRedirect, ProjectRedirect, ProjectSelectionRedirect } from '@/lib/utils/redirects';

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    LoginRedirect();
  }

  if (session?.project?.id) {
    ProjectRedirect(session.project.slug);
  }

  ProjectSelectionRedirect();
}
