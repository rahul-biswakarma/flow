import { useCountComponents } from "@flow/hooks";
import { useFlowContext } from "@flow/providers";
import { ClassicTabs } from "@ren/ui/components";
import { useEffect } from "react";
import { ComponentList } from "./component-list";

const TAB_CONTENT_CLASSNAME = "w-full h-full";
const TAB_TRIGGER_CLASSNAME = "px-4 text-[13px]";

export const ComponentManager = ({
  setShowHeaderCreateButton,
}: {
  setViewState: React.Dispatch<React.SetStateAction<"editor" | "manager">>;
  setShowHeaderCreateButton: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { projectData } = useFlowContext();

  const {
    data: publicComponentsCount,
    isLoading: publicComponentCountLoading,
  } = useCountComponents({
    projectId: projectData.id,
    status: "public",
  });

  const {
    data: privateComponentsCount,
    isLoading: privateComponentCountLoading,
  } = useCountComponents({
    projectId: projectData.id,
    status: "private",
  });

  const allComponentsCount = publicComponentsCount + privateComponentsCount;

  useEffect(() => {
    if (!publicComponentCountLoading && !privateComponentCountLoading) {
      setShowHeaderCreateButton(!!allComponentsCount);
    }
  }, [
    allComponentsCount,
    setShowHeaderCreateButton,
    publicComponentCountLoading,
    privateComponentCountLoading,
  ]);

  return (
    <div className="flex w-full h-full max-h-full min-h-0">
      <ClassicTabs.Root
        className="flex flex-col w-full max-h-full"
        defaultValue="all"
      >
        <ClassicTabs.List
          size="2"
          className="bg-panel-header !shadow-inset-gray"
        >
          <ClassicTabs.Trigger className={TAB_TRIGGER_CLASSNAME} value="all">
            All
            {!!allComponentsCount && (
              <span className="pl-2 text-gray-10">{allComponentsCount}</span>
            )}
          </ClassicTabs.Trigger>
          <ClassicTabs.Trigger
            className={TAB_TRIGGER_CLASSNAME}
            value="published"
          >
            Public
            {!!publicComponentsCount && (
              <span className="pl-2 text-gray-10">{publicComponentsCount}</span>
            )}
          </ClassicTabs.Trigger>
          <ClassicTabs.Trigger
            className={TAB_TRIGGER_CLASSNAME}
            value="private"
          >
            Private
            {!!privateComponentsCount && (
              <span className="pl-2 text-gray-10">
                {privateComponentsCount}
              </span>
            )}
          </ClassicTabs.Trigger>
        </ClassicTabs.List>

        <div className="h-full max-h-full min-h-0">
          <ClassicTabs.Content className={TAB_CONTENT_CLASSNAME} value="all">
            <ComponentList totalCount={allComponentsCount} />
          </ClassicTabs.Content>
          <ClassicTabs.Content
            className={TAB_CONTENT_CLASSNAME}
            value="published"
          >
            <ComponentList totalCount={publicComponentsCount} status="public" />
          </ClassicTabs.Content>
          <ClassicTabs.Content
            className={TAB_CONTENT_CLASSNAME}
            value="private"
          >
            <ComponentList
              totalCount={privateComponentsCount}
              status="private"
            />
          </ClassicTabs.Content>
        </div>
      </ClassicTabs.Root>
    </div>
  );
};
