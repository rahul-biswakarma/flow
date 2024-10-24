import { OnboardingPage } from "@/components/onboarding";
import { getProjects, getUserDetails } from "@v1/supabase/queries";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const user = await getUserDetails();

  if (!user) {
    redirect("/login");
  }

  const projects = await getProjects(user.id);

  return <OnboardingPage userData={user} projects={projects} />;
}
