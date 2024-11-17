"use client";

import { Loader } from "@/components/loader/loader";
import { Product } from "@/components/product/product";
import { SetupFlow } from "@/components/setup-flow";
import { FlowContextProvider } from "@/context";
import type { ProjectWithPages, User } from "@/types";
import { getProjectWithPages, getUserDetails } from "@v1/supabase/queries";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const useProjectData = (slug: string) => {
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useQuery(
    "user",
    getUserDetails,
    {
      onError: () => router.push("/login"),
    },
  );

  const { data: projectData, isLoading: isLoadingProject } = useQuery(
    ["project", slug],
    () => getProjectWithPages(slug),
    {
      enabled: !!user,
      onError: () => router.push("/404"),
    },
  );

  const isLoading = isLoadingUser || isLoadingProject;
  const showSetupFlow = !projectData?.setup_flow_completed;

  return { user, projectData, isLoading, showSetupFlow };
};

const queryClient = new QueryClient();

export default function ProjectWrapper(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(props.params);
  return (
    <QueryClientProvider client={queryClient}>
      <Project slug={params.slug} />
    </QueryClientProvider>
  );
}

function Project({ slug }: { slug: string }) {
  const { user, projectData, isLoading, showSetupFlow } = useProjectData(slug);

  const [isSetupFlowEnabled, setIsSetupFlowEnabled] = useState(showSetupFlow);

  useEffect(() => {
    if (showSetupFlow !== isSetupFlowEnabled) {
      setIsSetupFlowEnabled(showSetupFlow);
    }
  }, [showSetupFlow]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlowContextProvider
      user={user as User}
      projectWithPages={projectData as ProjectWithPages}
    >
      <AnimatePresence mode="wait">
        {isSetupFlowEnabled ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SetupFlow toggleSetupFlow={setIsSetupFlowEnabled} />
          </motion.div>
        ) : (
          <motion.div
            key="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: "hidden",
            }}
          >
            <Product />
          </motion.div>
        )}
      </AnimatePresence>
    </FlowContextProvider>
  );
}
