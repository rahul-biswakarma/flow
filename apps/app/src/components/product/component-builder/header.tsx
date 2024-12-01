import { propertiesClientToServer } from "@/adapters";
import { useFlowContext } from "@/context";
import { useScopedI18n } from "@/locales/client";
import type { Component } from "@/types";
import { createComponent } from "@v1/supabase/queries/client";
import { Button } from "@v1/ui/button";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { toast } from "@v1/ui/toast";
import { useState } from "react";
import { useComponentBuilderContext } from "./context";

export const ComponentBuilderHeader = ({
  isConfigValid,
  disabled,
  viewState,
  setViewState,
}: {
  disabled?: boolean;
  setViewState: React.Dispatch<React.SetStateAction<"editor" | "manager">>;
  viewState: "editor" | "manager";
  isConfigValid: boolean;
}) => {
  const scopedT = useScopedI18n("component_builder");

  const [isComponentCreating, setIsComponentCreating] = useState(false);

  const { projectData } = useFlowContext();
  const {
    componentName,
    componentDescription,
    componentKeywords,
    componentCode,
    componentProps,
  } = useComponentBuilderContext();

  const handleCreate = async () => {
    setIsComponentCreating(true);

    if (!projectData?.id) {
      return toast.error(scopedT("project_not_found"));
    }

    try {
      const project = await createComponent({
        component: {
          name: componentName,
          description: componentDescription,
          code: componentCode,
          keywords: componentKeywords,
        } as unknown as Component,
        properties: propertiesClientToServer(componentProps),
        projectId: projectData.id,
      });

      if (project) {
        toast.success(scopedT("component_published"));
      }
    } catch (error) {
      toast.error(scopedT("publish_error"));
    } finally {
      setIsComponentCreating(false);
    }
  };
  return (
    <div className="flex justify-between items-center gap-2 py-4 px-4 border-b border-panel bg-panel-header">
      <div className="flex gap-4 items-center">
        {viewState === "editor" && (
          <IconButton
            onClick={() => {
              setViewState("manager");
            }}
            disabled={disabled}
            variant="ghost"
            size="1"
            color="gray"
          >
            <Icons.ArrowLeft className="stroke-gray-10" />
          </IconButton>
        )}
        <Text size="4">{scopedT("title")}</Text>
      </div>
      <div className="flex justify-end items-center gap-2">
        {viewState === "editor" ? (
          <Button
            disabled={!isConfigValid || disabled}
            variant="surface"
            color="green"
            onClick={handleCreate}
            loading={isComponentCreating}
          >
            {!isComponentCreating && <Icons.Box />}
            {isComponentCreating ? scopedT("creating") : scopedT("publish")}
          </Button>
        ) : (
          <Button
            variant="surface"
            color="green"
            onClick={() => {
              setViewState("editor");
            }}
          >
            <Icons.Plus />
            {scopedT("build_new_component")}
          </Button>
        )}
      </div>
    </div>
  );
};
