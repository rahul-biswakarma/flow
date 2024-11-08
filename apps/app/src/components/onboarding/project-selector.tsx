import type { Project } from "@/types";
import { Avatar } from "@v1/ui/avatar";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";

import { useEffect, useState } from "react";

interface ProjectSelectorProps {
  project: Project;
  initialDomain?: string;
}

export function ProjectSelector({
  project,
  initialDomain,
}: ProjectSelectorProps) {
  const [domain, setDomain] = useState(initialDomain || "");

  useEffect(() => {
    if (!initialDomain) {
      setDomain(window.location.hostname);
    }
  }, [initialDomain]);

  return (
    <a href={project.slug}>
      <div className="flex group/project-selector gap-2 justify-between items-center p-3 border border-outline-02 bg-gray-a2 rounded-md overflow-hidden">
        <div className="flex gap-2 w-full">
          <Avatar fallback={"FL"} />
          <div className="flex flex-col w-full">
            <Text size="3" weight="medium" className="w-full truncate">
              {project.name}
            </Text>
            <Text size="2" className="text-gray-10 -mt-1 w-full truncate">
              {domain}/<span className="text-accent-10">{project.slug}</span>
            </Text>
          </div>
        </div>
        <IconButton
          className="invisible group-hover/project-selector:visible"
          variant="solid"
        >
          <Icons.ArrowRight />
        </IconButton>
      </div>
    </a>
  );
}
