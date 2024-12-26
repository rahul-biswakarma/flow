import { useComponentBuilderContext } from "@flow/components/product/component-builder/context";
import { useScopedI18n } from "@flow/locales/client";
import {
  ArrayTextFieldElement,
  type FieldOnChangeProps,
} from "@ren/ui/field-elements";

export const ComponentKeywordsField = () => {
  const scopedT = useScopedI18n("component_builder.field");

  const {
    componentKeywords,
    componentKeywordsRef,
    isAIGeneratingRef,
    isAIGenerating,
    setComponentKeywords,
  } = useComponentBuilderContext();

  return (
    <ArrayTextFieldElement
      isStreaming={isAIGenerating}
      ref={componentKeywordsRef}
      label={scopedT("keywords")}
      value={componentKeywords}
      onChange={(e: FieldOnChangeProps<string[]>): void => {
        if (!isAIGeneratingRef.current) {
          setComponentKeywords(e.value);
        }
      }}
    />
  );
};
