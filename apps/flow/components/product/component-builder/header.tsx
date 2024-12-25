import { propertiesClientToServer } from "@flow/adapters";
import { createComponent } from "@flow/data-layer/queries/client";
import type { Component } from "@flow/data-layer/types";
import {
  generateComponentCountKey,
  generateComponentListKey,
} from "@flow/hooks/components/keys";
import { useScopedI18n } from "@flow/locales/client";
import { useFlowContext } from "@flow/providers";
import { Button, IconButton, Text, toast } from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useState } from "react";
import { useComponentBuilderContext } from "./context";
import { CodeReviewDialog } from "./modals/review-modal";

export const ComponentBuilderHeader = ({
  disabled = false,
  viewState,
  setViewState,
  showHeaderCreateButton,
}: {
  disabled?: boolean;
  setViewState: React.Dispatch<React.SetStateAction<"editor" | "manager">>;
  viewState: "editor" | "manager";
  showHeaderCreateButton?: boolean;
}) => {
  const scopedT = useScopedI18n("component_builder");

  const [isComponentCreating, setIsComponentCreating] = useState(false);

  const { projectData, user } = useFlowContext();

  const {
    componentName,
    componentDescription,
    componentKeywords,
    componentCode,
    componentProps,
    isConfigValid,
    resetComponentBuilder,
  } = useComponentBuilderContext();

  const queryClient = useQueryClient();

  const handleCreate = async () => {
    setIsComponentCreating(true);

    if (!projectData?.id) {
      return toast.error(scopedT("project_not_found"));
    }

    try {
      const component = await createComponent({
        component: {
          name: componentName,
          description: componentDescription,
          code: componentCode,
          keywords: componentKeywords,
          status: "private",
          created_by: user.id,
        } as unknown as Component,
        properties: propertiesClientToServer(componentProps),
        projectId: projectData.id,
      });

      if (component) {
        toast.success(scopedT("component_published"));
        resetComponentBuilder();

        queryClient.invalidateQueries({
          queryKey: [
            generateComponentListKey({
              projectId: projectData.id,
              status: "private",
              page: 1,
            }),
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            generateComponentListKey({
              projectId: projectData.id,
              page: 1,
            }),
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            generateComponentCountKey({
              projectId: projectData.id,
              status: "private",
            }),
          ],
        });
        setTimeout(() => {
          setViewState("manager");
        }, 3000);
      }
    } catch {
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
          <CodeReviewDialog
            componentCode={componentCode}
            createHandler={handleCreate}
          >
            <Button
              disabled={!isConfigValid || disabled}
              variant="surface"
              color="green"
              loading={isComponentCreating}
            >
              {!isComponentCreating && (
                <Icons.Box
                  className={clsx({
                    "!text-gray-9": !isConfigValid || disabled,
                  })}
                />
              )}
              {isComponentCreating ? scopedT("creating") : scopedT("publish")}
            </Button>
          </CodeReviewDialog>
        ) : (
          showHeaderCreateButton && (
            <Button
              variant="soft"
              onClick={() => {
                setViewState("editor");
              }}
            >
              <Icons.Plus />
              {scopedT("build_new_component")}
            </Button>
          )
        )}
      </div>
    </div>
  );
};
