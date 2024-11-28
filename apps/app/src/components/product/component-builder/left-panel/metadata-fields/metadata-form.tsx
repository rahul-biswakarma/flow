import {
  ArrayTextFieldElement,
  StringFieldElement,
  TextFieldElement,
} from "@/components/field-elements";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { useScopedI18n } from "@/locales/client";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useComponentBuilderContext } from "../../context";
import { extractLastKeyword, isValidJSON } from "../../utils";

const fieldWrapperClass = "flex flex-col gap-1";

export const MetadataForm = () => {
  const scopedT = useScopedI18n("component_builder.field");
  const [streamingKeyword, setStreamingKeyword] = useState<string | null>(null);

  const {
    componentName,
    isAIGeneratingRef,
    setComponentName,
    componentDescription,
    setComponentDescription,
    componentKeywords,
    setComponentKeywords,
    streamingData,
  } = useComponentBuilderContext();

  useEffect(() => {
    if (
      streamingData?.componentKeywords &&
      !isValidJSON(streamingData.componentKeywords)
    ) {
      const lastKeyword = extractLastKeyword(streamingData.componentKeywords);
      if (lastKeyword && !componentKeywords.includes(lastKeyword)) {
        setStreamingKeyword(lastKeyword);
      }
    }
  }, [streamingData?.componentKeywords, componentKeywords]);

  return (
    <div className="flex w-full h-full p-3 gap-3 flex-col">
      <div className={clsx(fieldWrapperClass)}>
        <TextFieldElement
          label={scopedT("name")}
          value={componentName}
          onChange={(e: FieldOnChangeProps<string>): void => {
            if (!isAIGeneratingRef.current) {
              setComponentName(e.value);
            }
          }}
        />
      </div>
      <div className={clsx(fieldWrapperClass)}>
        <StringFieldElement
          label={scopedT("description")}
          value={componentDescription}
          onChange={(e: FieldOnChangeProps<string>): void => {
            if (!isAIGeneratingRef.current) {
              setComponentDescription(e.value);
            }
          }}
        />
      </div>
      <div className={clsx(fieldWrapperClass)}>
        <ArrayTextFieldElement
          label={scopedT("keywords")}
          value={componentKeywords}
          streamingValue={streamingKeyword}
          onChange={(e: FieldOnChangeProps<string[]>): void => {
            if (!isAIGeneratingRef.current) {
              setComponentKeywords(e.value);
            }
          }}
        />
      </div>
    </div>
  );
};
