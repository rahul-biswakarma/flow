import {} from "@/components/field-elements";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Tabs } from "@v1/ui/tabs";
import type React from "react";
import { Suspense, lazy } from "react";
import type { ComponentData } from "../types";
import { ComponentInfoForm } from "./component-info-form";

const SchemaBuilder = lazy(() => import("./schema-builder"));

export const FieldRenders = ({
  newComponentData,
  setNewComponentData,
}: {
  newComponentData: ComponentData;
  setNewComponentData: React.Dispatch<React.SetStateAction<ComponentData>>;
}) => {
  return (
    <Tabs.Root className="h-full" defaultValue="info">
      <Tabs.List size="2" className="bg-panel-header !shadow-inset-gray">
        <Tabs.Trigger value="info">Info</Tabs.Trigger>
        <Tabs.Trigger value="props">Properties</Tabs.Trigger>
      </Tabs.List>

      <ScrollArea className="bg-panel">
        <Tabs.Content value="info">
          <div className="w-full h-full max-h-full pb-[52px]">
            <ComponentInfoForm
              newComponentData={newComponentData}
              setNewComponentData={setNewComponentData}
            />
          </div>
        </Tabs.Content>
        <Tabs.Content value="props">
          <div className="flex w-full h-full max-h-full p-3 gap-3 pb-[52px] flex-col">
            <Suspense>
              <SchemaBuilder
                newComponentData={newComponentData}
                setNewComponentData={setNewComponentData}
              />
            </Suspense>
          </div>
        </Tabs.Content>
      </ScrollArea>
    </Tabs.Root>
  );
};
