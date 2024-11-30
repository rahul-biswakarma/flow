import { StringFieldElement } from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useScopedI18n } from "@/locales/client";
import { useComponentBuilderContext } from "../../../context";

export const ComponentDescriptionField = () => {
  const scopedT = useScopedI18n("component_builder.field");

  const {
    componentDescriptionRef,
    componentDescription,
    isAIGeneratingRef,
    setComponentDescription,
  } = useComponentBuilderContext();

  return (
    <StringFieldElement
      ref={componentDescriptionRef}
      label={scopedT("description")}
      value={componentDescription}
      onChange={(e: FieldOnChangeProps<string>): void => {
        if (!isAIGeneratingRef.current) {
          setComponentDescription(e.value);
        }
      }}
    />
  );
};
