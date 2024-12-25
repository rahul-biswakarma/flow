"use client";

import type { ProjectWithPages, User } from "@flow/data-layer/types";
import { FlowContextProvider } from "@flow/providers";
import { Toaster } from "@ren/ui/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Onboarding } from "./onboarding";
import { Product } from "./product";

const queryClient = new QueryClient();

export default function ProductWrapper({
  user,
  projectData,
}: {
  user: User;
  projectData: ProjectWithPages;
}) {
  const showSetupFlow = !projectData?.config?.setup_flow_completed;

  const [isSetupFlowEnabled, setIsSetupFlowEnabled] = useState(showSetupFlow);

  useEffect(() => {
    if (showSetupFlow !== isSetupFlowEnabled) {
      setIsSetupFlowEnabled(showSetupFlow);
    }
  }, [showSetupFlow, isSetupFlowEnabled]);

  return (
    <QueryClientProvider client={queryClient}>
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
              <Onboarding toggleSetupFlow={setIsSetupFlowEnabled} />
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
        <Toaster richColors position="top-center" />
      </FlowContextProvider>
    </QueryClientProvider>
  );
}
