import {} from "@/components/field-elements";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Tabs } from "@v1/ui/tabs";
import { MetadataForm } from "./metadata-form";
import { PropsBuilder } from "./props-builder";

export const MetadataFields = () => {
  return (
    <div className="flex grow w-full h-full">
      <Tabs.Root className="h-full" defaultValue="info">
        <Tabs.List size="2" className="bg-panel-header !shadow-inset-gray">
          <Tabs.Trigger value="info">Info</Tabs.Trigger>
          <Tabs.Trigger value="props">Properties</Tabs.Trigger>
        </Tabs.List>

        <ScrollArea className="flex bg-panel">
          <Tabs.Content value="info">
            <div className="w-full h-full max-h-full">
              <MetadataForm />
            </div>
          </Tabs.Content>
          <Tabs.Content value="props">
            <div className="flex w-full h-full max-h-full p-3 gap-3 flex-col">
              <PropsBuilder />
            </div>
          </Tabs.Content>
        </ScrollArea>
      </Tabs.Root>
    </div>
  );
};
