import {} from "@/components/field-elements";
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
    <Tabs.Root defaultValue="info">
      <Tabs.List
        size="2"
        className="sticky top-0 left-0 z-10 bg-gray-1 !shadow-inset-gray"
      >
        <Tabs.Trigger value="info">Info</Tabs.Trigger>
        <Tabs.Trigger value="props">Properties</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="info">
        <ComponentInfoForm
          newComponentData={newComponentData}
          setNewComponentData={setNewComponentData}
        />
      </Tabs.Content>
      <Tabs.Content value="props">
        <div className="flex w-full h-full p-3 gap-3 flex-col">
          <Suspense>
            <SchemaBuilder
              newComponentData={newComponentData}
              setNewComponentData={setNewComponentData}
            />
          </Suspense>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};
