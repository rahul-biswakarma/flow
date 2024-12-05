import { useFlowContext } from "@/context";
import { useCountComponents } from "@/hooks";
import { Tabs } from "@v1/ui/tabs";
import { ComponentList } from "./component-list";

const TAB_CONTENT_CLASSNAME = "w-full h-full";

export const ComponentManager = () => {
  const { projectData } = useFlowContext();

  const { data: publicComponentsCount } = useCountComponents({
    projectId: projectData.id,
    status: "public",
  });

  const { data: privateComponentsCount } = useCountComponents({
    projectId: projectData.id,
    status: "private",
  });

  console.log({ publicComponentsCount, privateComponentsCount });

  const allComponentsCount = publicComponentsCount + privateComponentsCount;

  return (
    <div className="flex w-full h-full max-h-full min-h-0">
      <Tabs.Root className="flex flex-col w-full max-h-full" defaultValue="all">
        <Tabs.List size="2" className="bg-panel-header !shadow-inset-gray">
          <Tabs.Trigger value="all">
            All{" "}
            {allComponentsCount && (
              <span className="pl-2 text-gray-10">{allComponentsCount}</span>
            )}
          </Tabs.Trigger>
          <Tabs.Trigger value="published">
            Public
            {publicComponentsCount && (
              <span className="pl-2 text-gray-10">{publicComponentsCount}</span>
            )}
          </Tabs.Trigger>
          <Tabs.Trigger value="private">
            Private
            {privateComponentsCount && (
              <span className="pl-2 text-gray-10">
                {privateComponentsCount}
              </span>
            )}
          </Tabs.Trigger>
        </Tabs.List>

        <div className="h-full max-h-full min-h-0">
          <Tabs.Content className={TAB_CONTENT_CLASSNAME} value="all">
            <ComponentList totalCount={allComponentsCount} />
          </Tabs.Content>
          <Tabs.Content className={TAB_CONTENT_CLASSNAME} value="published">
            <ComponentList totalCount={publicComponentsCount} status="public" />
          </Tabs.Content>
          <Tabs.Content className={TAB_CONTENT_CLASSNAME} value="private">
            <ComponentList
              totalCount={privateComponentsCount}
              status="private"
            />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};
