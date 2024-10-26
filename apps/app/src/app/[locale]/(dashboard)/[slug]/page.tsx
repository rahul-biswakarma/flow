"use client";

import { Loader } from "@/components/loader/loader";
import { Product } from "@/components/product/product";
import { SetupFlow } from "@/components/setup-flow";
import { FlowContextProvider } from "@/context";
import type { ProjectWithPages, User } from "@/types";
import { getProjectWithPages, getUserDetails } from "@v1/supabase/queries";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

export default function Project({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [projectWithPages, setProjectWithPages] =
    useState<ProjectWithPages | null>(null);
  const [showSetupFlow, setShowSetupFlow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = await getUserDetails();
      if (!userDetails) {
        redirect("/login");
        return;
      }
      setUser(userDetails);

      const projectData = await getProjectWithPages(slug);
      if (!projectData) {
        redirect("/404");
        return;
      }
      const triggerSetupFlow =
        Object.keys(projectWithPages?.config ?? {}).length === 0;
      setShowSetupFlow(triggerSetupFlow);
      setProjectWithPages(projectData);
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading && !user && !projectWithPages) {
    return <Loader />;
  }

  return (
    <FlowContextProvider
      user={user as User}
      projectWithPages={projectWithPages as ProjectWithPages}
    >
      {showSetupFlow ? (
        <SetupFlow toggleSetupFlow={(e: boolean) => setShowSetupFlow(e)} />
      ) : (
        <Product />
      )}
    </FlowContextProvider>
  );
}
