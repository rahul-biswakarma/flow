"use client";
import { useI18n } from "@/locales/client";
import type { Project, User } from "@/types";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { useState } from "react";
import { CreateProject } from "./create-project";
import { ProjectManager } from "./project-manager";
import type { OnboardingViews } from "./type";
import { OnboardingUserCard } from "./user-card";

export const OnboardingPage = ({
  userData,
  projects,
}: { userData: User; projects: Project[] }) => {
  const t = useI18n();
  const [view, setView] = useState<OnboardingViews>("select_project");

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full flex justify-between gap-2 absolute top-0 left-0 px-4 py-2">
        <div>
          {view === "create_project" && (
            <Button
              onClick={() => setView("select_project")}
              variant="ghost"
              className="space-x-3"
            >
              <Icons.ChevronLeft />
              {t("onboarding.back_to_selection")}
            </Button>
          )}
        </div>
        {<OnboardingUserCard userData={userData} />}
      </div>
      {view === "select_project" && (
        <ProjectManager
          showCreateView={() => {
            setView("create_project");
          }}
          projects={projects}
          userData={userData}
        />
      )}
      {view === "create_project" && <CreateProject userData={userData} />}
    </div>
  );
};
