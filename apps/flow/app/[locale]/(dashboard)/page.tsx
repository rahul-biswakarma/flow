import { FlowLoader } from "@flow/components";
import {
  getUserDetails,
  getUserProjects,
} from "@flow/data-layer/queries/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function PageWrapper() {
  const user = await getUserDetails();

  console.log("hello", user);

  if (!user) {
    redirect("/login");
  }

  const projects = await getUserProjects({
    userId: user.id,
    page: 1,
  });

  return (
    <Suspense fallback={<FlowLoader />}>
      {/* <OnboardingPage userData={user} projects={projects || []} /> */}
    </Suspense>
  );
}
