import { Tabs } from "@v1/ui/tabs";
import { ComponentList } from "./component-list";

const TAB_CONTENT_CLASSNAME =
  "flex w-full max-h-full min-w-full overflow-x-hidden";

export const ComponentManager = () => {
  return (
    <div className="flex w-full h-full max-h-full min-h-0">
      <Tabs.Root className="flex flex-col w-full max-h-full" defaultValue="all">
        <Tabs.List size="2" className="bg-panel-header !shadow-inset-gray">
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="published">Published</Tabs.Trigger>
          <Tabs.Trigger value="private">Private</Tabs.Trigger>
        </Tabs.List>

        <div className="flex max-h-full min-h-0">
          <Tabs.Content className={TAB_CONTENT_CLASSNAME} value="all">
            <ComponentList />
          </Tabs.Content>
          <Tabs.Content className="max-h-full" value="published">
            <ComponentList status="public" />
          </Tabs.Content>
          <Tabs.Content className="max-h-full" value="private">
            <ComponentList status="private" />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};
