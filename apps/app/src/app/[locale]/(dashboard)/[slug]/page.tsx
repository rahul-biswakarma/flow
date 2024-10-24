import { SetupFlow } from "@/components/setup-flow/setup-flow";
import { FlowContextProvider } from "@/context";
import type { ProjectWithPages, User } from "@/types";
import {
  getProjectWithPages,
  getUser,
  getUserDetails,
} from "@v1/supabase/queries";
import { redirect } from "next/navigation";

export default async function Project({
  params,
}: { params: { slug: string } }) {
  const { slug } = await params;

  const user = await getUserDetails();

  if (!user) {
    redirect("/login");
  }

  const projectWithPages: ProjectWithPages = await getProjectWithPages(slug);

  if (!projectWithPages) {
    redirect("/404");
  }

  const triggerSetupFlow =
    Object.keys(projectWithPages.config ?? {}).length === 0;

  return (
    <FlowContextProvider user={user} projectWithPages={projectWithPages}>
      {triggerSetupFlow ? <SetupFlow /> : <div>hello</div>}
    </FlowContextProvider>
  );
}
