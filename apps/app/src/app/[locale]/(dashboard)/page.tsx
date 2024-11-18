import { Loader } from "@/components/loader/loader";
import { OnboardingPage } from "@/components/onboarding";
import type {} from "@/types";
import { getUserDetails, getUserProjects } from "@v1/supabase/queries/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function PageWrapper() {
  const user = await getUserDetails();

  if (!user) {
    redirect("/login");
  }

  const projects = await getUserProjects({
    userId: user.id,
    page: 1,
  });

  return (
    <Suspense fallback={<Loader />}>
      <OnboardingPage userData={user} projects={projects || []} />
    </Suspense>
  );
}
