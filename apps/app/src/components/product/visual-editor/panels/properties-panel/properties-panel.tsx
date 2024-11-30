import { ScrollArea } from "@v1/ui/scroll-area";
import { Tabs } from "@v1/ui/tabs";
// import { ActionEditor } from "./action-editor";
// import { PropertiesEditor } from "./properties-editor";
// import { StyleEditor } from "./style-editor";

export const PropertiesPanel = () => {
  return (
    <div className="h-full bg-panel">
      <Tabs.Root defaultValue="properties">
        <Tabs.List>
          <Tabs.Trigger value="properties">Properties</Tabs.Trigger>
          <Tabs.Trigger value="styles">Styles</Tabs.Trigger>
          <Tabs.Trigger value="actions">Actions</Tabs.Trigger>
        </Tabs.List>
        <ScrollArea className="h-[calc(100%-40px)]">
          <div className="p-4">
            {/* <Tabs.Content value="properties">
              <PropertiesEditor />
            </Tabs.Content>
            <Tabs.Content value="styles">
              <StyleEditor />
            </Tabs.Content>
            <Tabs.Content value="actions">
              <ActionEditor />
            </Tabs.Content> */}
          </div>
        </ScrollArea>
      </Tabs.Root>
    </div>
  );
};
