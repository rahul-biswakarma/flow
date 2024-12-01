import { useFlowContext } from "@/context";
import { useScopedI18n } from "@/locales/client";
import type { Component } from "@/types";
import { createComponent } from "@v1/supabase/queries/client";
import { Button } from "@v1/ui/button";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { toast } from "@v1/ui/toast";
import { useComponentBuilderContext } from "./context";

export const ComponentBuilderHeader = ({
  isConfigValid,
  disabled,
}: {
  disabled?: boolean;
  isConfigValid: boolean;
}) => {
  const scopedT = useScopedI18n("component_builder");
  const { projectData } = useFlowContext();
  const {
    componentName,
    componentDescription,
    componentKeywords,
    componentCode,
  } = useComponentBuilderContext();

  const handleCreate = async () => {
    const project = await createComponent({
      component: {
        name: componentName,
        description: componentDescription,
        code: componentCode,
        keywords: componentKeywords,
      } as Component,
      properties: {},
    });

    if (project?.id) {
      toast.success(scopedT("component_published"));
    } else {
      toast.error(scopedT("publish_error"));
    }
  };
  return (
    <div className="flex justify-between items-center gap-2 py-4 px-4 border-b border-panel bg-panel-header">
      <div className="flex gap-4 items-center">
        <IconButton disabled={disabled} variant="ghost" size="1" color="gray">
          <Icons.ArrowLeft className="stroke-gray-10" />
        </IconButton>
        <Text size="4">{scopedT("title")}</Text>
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button
          disabled={!isConfigValid || disabled}
          variant="surface"
          onClick={handleCreate}
        >
          {scopedT("publish")}
        </Button>
      </div>
    </div>
  );
};
