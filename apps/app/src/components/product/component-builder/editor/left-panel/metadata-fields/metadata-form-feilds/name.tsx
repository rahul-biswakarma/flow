import { TextFieldElement } from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useComponentBuilderContext } from "@/components/product/component-builder/context";
import { useScopedI18n } from "@/locales/client";

export const ComponentNameField = () => {
  const scopedT = useScopedI18n("component_builder.field");

  const {
    componentNameRef,
    componentName,
    isAIGeneratingRef,
    setComponentName,
  } = useComponentBuilderContext();

  return (
    <TextFieldElement
      ref={componentNameRef}
      label={scopedT("name")}
      value={componentName}
      onChange={(e: FieldOnChangeProps<string>): void => {
        if (!isAIGeneratingRef.current) {
          setComponentName(e.value);
        }
      }}
    />
  );
};
