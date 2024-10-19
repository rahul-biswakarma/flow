import type { Project, User } from "@/types";

import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { ProjectSelector } from "./project-selector";

interface ProjectManagerProps {
  userData: User;
  projects: Project[];
  showCreateView: () => void;
}

export const ProjectManager = ({
  userData,
  projects,
  showCreateView,
}: ProjectManagerProps) => {
  const scopedT = useScopedI18n("onboarding");

  const projectsAvailable = projects.length > 0;

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-4 z-1">
      <Heading weight="medium" size="7" highContrast={false}>
        {scopedT("select")}
      </Heading>
      <Text size="2" className="text-gray-10">
        {scopedT("select_description", {
          email: <span className="text-gray-12">{userData.email}</span>,
        })}
      </Text>
      {!projectsAvailable && (
        <div className="w-full max-w-[700px] border border-outline-00 bg-surface rounded-base">
          <div className="flex flex-col gap-0.5 justify-center items-center py-8 h-full min-h-[200px] ">
            <Text size="2">{scopedT("empty")}</Text>
            <Text className="text-gray-10" size="2" highContrast={false}>
              {scopedT("get_started")}
            </Text>
            <Button onClick={showCreateView} className="mt-4" variant="solid">
              <Icons.Plus />
              {scopedT("new")}
            </Button>
          </div>
        </div>
      )}
      {projectsAvailable && (
        <div className="flex flex-col gap-2 w-full max-w-[700px]">
          {projects.map((project) => (
            <ProjectSelector key={project.id} project={project} />
          ))}
          <Button
            onClick={showCreateView}
            className="w-full mt-4"
            variant="solid"
          >
            <Icons.ArrowRight />
            {scopedT("create_new_project")}
          </Button>
        </div>
      )}
    </div>
  );
};
