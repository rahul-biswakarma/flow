import type { Project } from "@/types";
import { Avatar } from "@v1/ui/avatar";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";

export const ProjectSelector = ({ project }: { project: Project }) => {
  return (
    <div className="flex gap-2 justify-between items-center p-3 border border-outline-02 bg-panel-translucent rounded-md overflow-hidden">
      <div className="flex gap-2">
        <Avatar fallback={"FL"} />
        <div className="flex flex-col">
          <Text size="3" weight="medium">
            {project.name}
          </Text>
          <Text size="2" className="text-gray-10 -mt-1">
            {window?.location?.hostname}/
            <span className="text-accent-10">{project.slug}</span>
          </Text>
        </div>
      </div>
      <IconButton variant="solid">
        <Icons.ArrowRight />
      </IconButton>
    </div>
  );
};
