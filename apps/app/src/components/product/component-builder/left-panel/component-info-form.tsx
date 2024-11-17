import {
  ArrayTextFieldElement,
  StringFieldElement,
  TextFieldElement,
} from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useScopedI18n } from "@/locales/client";
import { clsx } from "clsx";
import type { ComponentData } from "../types";

const fieldWrapperClass = "flex flex-col gap-1";

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
      <div className={clsx(fieldWrapperClass)}>
        <TextFieldElement
          label={scopedT("name")}
          value={newComponentData.name}
          onChange={(e: FieldOnChangeProps<string>): void => {
            setNewComponentData((prev) => ({ ...prev, name: e.value }));
          }}
        />
      </div>
      <div className={clsx(fieldWrapperClass)}>
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
      </div>
      <div className={clsx(fieldWrapperClass)}>
        <ArrayTextFieldElement
          label={scopedT("keywords")}
          value={newComponentData.keywords}
          onChange={handleKeywordsChange}
        />
      </div>
    </div>
  );
};
