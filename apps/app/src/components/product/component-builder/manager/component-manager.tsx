import { ScrollArea } from "@v1/ui/scroll-area";
import { Tabs } from "@v1/ui/tabs";
import { ComponentList } from "./component-list";

export const ComponentManager = () => {
  return (
    <div className="flex w-full h-full max-h-full min-h-0">
      <Tabs.Root className="flex flex-col w-full max-h-full" defaultValue="all">
        <Tabs.List size="2" className="bg-panel-header !shadow-inset-gray">
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="published">Published</Tabs.Trigger>
          <Tabs.Trigger value="private">Private</Tabs.Trigger>
        </Tabs.List>
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <Tabs.Content value="all">
              <ComponentList />
            </Tabs.Content>
            <Tabs.Content value="published">
              <ComponentList status="public" />
            </Tabs.Content>
            <Tabs.Content value="private">
              <ComponentList status="private" />
            </Tabs.Content>
          </ScrollArea>
        </div>
      </Tabs.Root>
    </div>
  );
};
