import {
  ArrayTextFieldElement,
  StringFieldElement,
  TextFieldElement,
} from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useScopedI18n } from "@/locales/client";
import { Tabs } from "@v1/ui/tabs";
import type React from "react";
import { Suspense, lazy } from "react";
import type { ComponentData } from "./types";

const SchemaBuilder = lazy(() => import("./schema-builder"));

export const FieldRenders = ({
  newComponentData,
  setNewComponentData,
}: {
  newComponentData: ComponentData;
  setNewComponentData: React.Dispatch<React.SetStateAction<ComponentData>>;
}) => {
  const scopedT = useScopedI18n("component_builder.field");

  const handleKeywordsChange = (e: FieldOnChangeProps<string[]>) => {
    setNewComponentData((prev) => {
      if (prev.keywords !== e.value) {
        return {
          ...prev,
          keywords: e.value,
        };
      }
      return prev;
    });
  };

  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List size="2">
        <Tabs.Trigger className="!py-0" value="account">
          Info
        </Tabs.Trigger>
        <Tabs.Trigger className="!py-0" value="password">
          Properties
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <div className="flex w-full h-full p-3 gap-3 flex-col">
          <div className="space-y-1.5 border border-outline-02 bg-gray-a2 rounded-md p-3">
            <TextFieldElement
              label={scopedT("name")}
              value={newComponentData.name}
              onChange={(e: FieldOnChangeProps<string>): void => {
                setNewComponentData((prev) => ({ ...prev, name: e.value }));
              }}
            />
            <StringFieldElement
              label={scopedT("description")}
              value={newComponentData.description}
              onChange={(e: FieldOnChangeProps<string>): void => {
                setNewComponentData((prev) => ({
                  ...prev,
                  description: e.value,
                }));
              }}
            />
            <ArrayTextFieldElement
              label={scopedT("keywords")}
              value={newComponentData.keywords}
              onChange={handleKeywordsChange}
            />
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content value="password">
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
