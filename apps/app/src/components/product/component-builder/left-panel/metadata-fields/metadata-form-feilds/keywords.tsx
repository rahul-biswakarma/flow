import { ArrayTextFieldElement } from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useScopedI18n } from "@/locales/client";
import { useComponentBuilderContext } from "../../../context";

export const ComponentKeywordsField = () => {
  const scopedT = useScopedI18n("component_builder.field");

  const { componentKeywords, isAIGeneratingRef, setComponentKeywords } =
    useComponentBuilderContext();

  return (
    <ArrayTextFieldElement
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