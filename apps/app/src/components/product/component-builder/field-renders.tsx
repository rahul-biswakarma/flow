import {
  ArrayTextFieldElement,
  GroupFieldWrapper,
  StringFieldElement,
  TextFieldElement,
} from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useScopedI18n } from "@/locales/client";
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
    <div className="flex w-full h-full p-3 gap-3 flex-col">
      <GroupFieldWrapper groupLabel={scopedT("component_info_group_title")}>
        <TextFieldElement
          label={scopedT("name")}
          placeholder={scopedT("name_placeholder")}
          value={newComponentData.name}
          onChange={(e: FieldOnChangeProps<string>): void => {
            setNewComponentData((prev) => ({ ...prev, name: e.value }));
          }}
        />
        <StringFieldElement
          label={scopedT("description")}
          placeholder={scopedT("description_placeholder")}
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
          placeholder={scopedT("keywords_placeholder")}
          value={newComponentData.keywords}
          onChange={handleKeywordsChange}
        />
      </GroupFieldWrapper>
      <Suspense>
        <SchemaBuilder
          newComponentData={newComponentData}
          setNewComponentData={setNewComponentData}
        />
      </Suspense>
    </div>
  );
};
