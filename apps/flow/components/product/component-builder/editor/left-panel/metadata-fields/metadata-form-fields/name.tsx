import { useComponentBuilderContext } from "@flow/components/product/component-builder/context";
import { useScopedI18n } from "@flow/locales/client";
import {
  type FieldOnChangeProps,
  TextFieldElement,
} from "@ren/ui/field-elements";

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
