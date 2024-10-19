"use client";
import { useI18n } from "@/locales/client";
import type { Project, User } from "@/types";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Toaster } from "@v1/ui/toast";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CreateProject } from "./create-project";
import { ProjectManager } from "./project-manager";
import type { OnboardingViews } from "./type";
import { OnboardingUserCard } from "./user-card";

const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
};

export function OnboardingPage({
  userData,
  projects,
}: {
  userData: User;
  projects: Project[];
}) {
  const t = useI18n();
  const [view, setView] = useState<OnboardingViews>("select_project");
  const [direction, setDirection] = useState(0);

  const changeView = (newView: OnboardingViews) => {
    setDirection(newView === "create_project" ? 1 : -1);
    setView(newView);
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full flex justify-between gap-2 absolute top-0 left-0 px-4 py-2">
        <div>
          {view === "create_project" && (
            <Button
              onClick={() => changeView("select_project")}
              variant="ghost"
              className="space-x-3"
            >
              <Icons.ChevronLeft />
              {t("onboarding.back_to_selection")}
            </Button>
          )}
        </div>
        <OnboardingUserCard userData={userData} />
      </div>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {view === "select_project" ? (
          <motion.div
            key="project-manager"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            layout
          >
            <ProjectManager
              showCreateView={() => changeView("create_project")}
              projects={projects}
              userData={userData}
            />
          </motion.div>
        ) : (
          <motion.div
            key="create-project"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            layout
          >
            <CreateProject
              showProjectManger={() => changeView("select_project")}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster richColors position="top-center" />
    </div>
  );
}