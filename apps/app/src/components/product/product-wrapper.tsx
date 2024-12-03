"use client";

import { Product } from "@/components/product/product";
import { SetupFlow } from "@/components/setup-flow";
import { FlowContextProvider } from "@/context";
import type { ProjectWithPages, User } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  }, [showSetupFlow]);

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
