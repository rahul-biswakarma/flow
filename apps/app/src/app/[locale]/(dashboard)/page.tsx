import { OnboardingPage } from "@/components/onboarding";
import type { User } from "@/types";
import { getProjects, getUser, getUserDetails } from "@v1/supabase/queries";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  let user: User | null = null;
  const { data: userData } = await getUser();
  if (userData.user) {
    user = await getUserDetails(userData.user.id);
  }

  if (!user) {
    redirect("/login");
  }

  const projects = await getProjects(user.id);

  return <OnboardingPage userData={user} projects={projects} />;
}
