import {
  ArrayTextFieldElement,
  StringFieldElement,
  TextFieldElement,
} from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useScopedI18n } from "@/locales/client";
import type { ComponentData } from "../types";

export const ComponentInfoForm = ({
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
  );
};