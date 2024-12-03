import { Tabs } from "@v1/ui/tabs";

export const ComponentManager = () => {
  return (
    <Tabs.Root>
      <Tabs.List size="2" className="bg-panel-header !shadow-inset-gray">
        <Tabs.Trigger value="all">All</Tabs.Trigger>
        <Tabs.Trigger value="published">Published</Tabs.Trigger>
        <Tabs.Trigger value="private">Private</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="all">dsdks</Tabs.Content>
    </Tabs.Root>
  );
};
