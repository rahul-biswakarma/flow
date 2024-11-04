"use client";

import { Loader } from "@/components/loader/loader";
import { OnboardingPage } from "@/components/onboarding";
import type {} from "@/types";
import { getProjects, getUserDetails } from "@v1/supabase/queries";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function PageWrapper() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Page />
    </QueryClientProvider>
  );
}

function Page() {
  const router = useRouter();

  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery("user", getUserDetails, {
    onError: () => router.push("/login"),
    retry: false,
  });

  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: projectsError,
  } = useQuery(
    ["projects", userData?.id],
    () => getProjects(userData?.id ?? ""),
    {
      enabled: !!userData,
    },
  );

  const isLoading = isLoadingUser || isLoadingProjects;
  const error = userError || projectsError;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    router.push("/login");
  }

  if (!userData) {
    return null; // This shouldn't happen due to the redirect, but just in case
  }

  return <OnboardingPage userData={userData} projects={projects || []} />;
}
