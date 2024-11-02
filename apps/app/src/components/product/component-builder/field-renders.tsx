import {
  ArrayTextFieldElement,
  GroupFieldWrapper,
  StringFieldElement,
  TextFieldElement,
} from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useScopedI18n } from "@/locales/client";
import { ScrollArea } from "@v1/ui/scroll-area";
import type React from "react";
import type { ComponentData } from "./types";

export const FieldRenders = ({
  newComponentData,
  setNewComponentData,
}: {
  newComponentData: ComponentData;
  setNewComponentData: React.Dispatch<React.SetStateAction<ComponentData>>;
}) => {
  const scopedT = useScopedI18n("component_builder.field");
  return (
    <ScrollArea>
      <div className="flex w-full h-full gap-4 flex-col">
        <GroupFieldWrapper groupLabel={scopedT("marketplace_info_group_title")}>
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
            onChange={(e: FieldOnChangeProps<string[]>): void => {
              setNewComponentData((prev) => ({
                ...prev,
                keywords: e.value,
              }));
            }}
          />
        </GroupFieldWrapper>
        <GroupFieldWrapper groupLabel={scopedT("props_schema_group_title")}>
          2
        </GroupFieldWrapper>
      </div>
    </ScrollArea>
  );
};
