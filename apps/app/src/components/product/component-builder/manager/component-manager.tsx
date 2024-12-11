import { useFlowContext } from "@/context";
import { useCountComponents } from "@/hooks";
import { Tabs } from "@v1/ui/tabs";
import { useEffect } from "react";
import { ComponentList } from "./component-list";
import { ComponentListEmpty } from "./empty-state";

const TAB_CONTENT_CLASSNAME = "w-full h-full";
const TAB_TRIGGER_CLASSNAME = "px-4 text-[13px]";

export const ComponentManager = ({
  setViewState,
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
    setShowHeaderCreateButton(!!allComponentsCount);
  }, [allComponentsCount, setShowHeaderCreateButton]);

  return (
    <div className="flex w-full h-full max-h-full min-h-0">
      <Tabs.Root className="flex flex-col w-full max-h-full" defaultValue="all">
        <Tabs.List size="2" className="bg-panel-header !shadow-inset-gray">
          <Tabs.Trigger className={TAB_TRIGGER_CLASSNAME} value="all">
            All
            {!!allComponentsCount && (
              <span className="pl-2 text-gray-10">{allComponentsCount}</span>
            )}
          </Tabs.Trigger>
          <Tabs.Trigger className={TAB_TRIGGER_CLASSNAME} value="published">
            Public
            {!!publicComponentsCount && (
              <span className="pl-2 text-gray-10">{publicComponentsCount}</span>
            )}
          </Tabs.Trigger>
          <Tabs.Trigger className={TAB_TRIGGER_CLASSNAME} value="private">
            Private
            {!!privateComponentsCount && (
              <span className="pl-2 text-gray-10">
                {privateComponentsCount}
              </span>
            )}
          </Tabs.Trigger>
        </Tabs.List>

        <div className="h-full max-h-full min-h-0">
          <Tabs.Content className={TAB_CONTENT_CLASSNAME} value="all">
            {!allComponentsCount ? (
              <ComponentListEmpty
                isLoading={
                  publicComponentCountLoading || privateComponentCountLoading
                }
                setViewState={setViewState}
              />
            ) : (
              <ComponentList totalCount={allComponentsCount} />
            )}
          </Tabs.Content>
          <Tabs.Content className={TAB_CONTENT_CLASSNAME} value="published">
            {!publicComponentsCount ? (
              <ComponentListEmpty
                isLoading={publicComponentCountLoading}
                setViewState={setViewState}
              />
            ) : (
              <ComponentList
                totalCount={publicComponentsCount}
                status="public"
              />
            )}
          </Tabs.Content>
          <Tabs.Content className={TAB_CONTENT_CLASSNAME} value="private">
            {!privateComponentsCount ? (
              <ComponentListEmpty
                isLoading={privateComponentCountLoading}
                setViewState={setViewState}
              />
            ) : (
              <ComponentList
                totalCount={privateComponentsCount}
                status="private"
              />
            )}
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};
