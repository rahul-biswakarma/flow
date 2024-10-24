"use client";

import { Loader } from "@/components/loader/loader";
import { OnboardingPage } from "@/components/onboarding";
import type { Project, User } from "@/types";
import { getProjects, getUserDetails } from "@v1/supabase/queries";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

export default async function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserDetails();
      setUserData(user);
      if (!user) {
        redirect("/login");
      } else {
        const projectData = await getProjects(user.id);
        setProjects(projectData);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <OnboardingPage userData={userData as User} projects={projects} />;
}
