import { useComponentBuilderContext } from "@flow/components/product/component-builder/context";
import { useScopedI18n } from "@flow/locales/client";
import {
  type FieldOnChangeProps,
  StringFieldElement,
} from "@ren/ui/field-elements";

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
