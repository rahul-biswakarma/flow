interface ParsedFields {
  explanation: string;
  componentName: string;
  componentDescription: string;
  componentKeywords: string;
  componentProps: string;
  componentCode: string;
}

export function parseAIResponse(response: string): ParsedFields {
  const parsedData: ParsedFields = {
    explanation: "",
    componentName: "",
    componentDescription: "",
    componentKeywords: "",
    componentProps: "",
    componentCode: "",
  };

  const text = response.toString();

  // Live update for simple string fields
  const updateStringField = (
    field: keyof ParsedFields,
    openTag: string,
    closeTag: string,
  ) => {
    const startIndex = text.lastIndexOf(openTag);
    if (startIndex !== -1) {
      const endIndex = text.indexOf(closeTag, startIndex);
      const content =
        endIndex !== -1
          ? text.slice(startIndex + openTag.length, endIndex)
          : text.slice(startIndex + openTag.length);
      parsedData[field] = content.trim();
    }
  };

  // Parse fields that require complete data
  const parseCompleteField = (
    field: keyof ParsedFields,
    openTag: string,
    closeTag: string,
  ) => {
    const regex = new RegExp(`${openTag}([\\s\\S]*?)${closeTag}`);
    const match = text.match(regex);
    if (match?.[1]) {
      parsedData[field] = match[1].trim();
    }
  };

  // Parse simple string fields
  updateStringField(
    "explanation",
    "<ComponentExplanation>",
    "</ComponentExplanation>",
  );
  updateStringField("componentName", "<ComponentName>", "</ComponentName>");
  updateStringField(
    "componentDescription",
    "<ComponentDescription>",
    "</ComponentDescription>",
  );

  // Parse fields that require complete data
  parseCompleteField(
    "componentKeywords",
    "<ComponentKeywords>",
    "</ComponentKeywords>",
  );
  parseCompleteField("componentProps", "<ComponentProps>", "</ComponentProps>");
  updateStringField("componentCode", "<ComponentCode>", "</ComponentCode>");

  return parsedData;
}
