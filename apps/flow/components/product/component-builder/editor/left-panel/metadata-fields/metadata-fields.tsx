import { ClassicTabs, ScrollArea } from "@ren/ui/components";
import { MetadataForm } from "./metadata-form";
import { PropsBuilder } from "./props-builder";

export const MetadataFields = () => {
  return (
    <div className="flex grow w-full h-full">
      <ClassicTabs.Root className="h-full" defaultValue="info">
        <ClassicTabs.List
          size="2"
          className="bg-panel-header !shadow-inset-gray"
        >
          <ClassicTabs.Trigger value="info">Info</ClassicTabs.Trigger>
          <ClassicTabs.Trigger value="props">Properties</ClassicTabs.Trigger>
        </ClassicTabs.List>

        <ScrollArea className="flex bg-panel">
          <ClassicTabs.Content value="info">
            <div className="w-full h-full max-h-full">
              <MetadataForm />
            </div>
          </ClassicTabs.Content>
          <ClassicTabs.Content value="props">
            <div className="flex w-full h-full max-h-full p-3 gap-3 flex-col">
              <PropsBuilder />
            </div>
          </ClassicTabs.Content>
        </ScrollArea>
      </ClassicTabs.Root>
    </div>
  );
};
