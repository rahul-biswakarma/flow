import type {} from "./types";

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

  // Extract fields
  parsedData.explanation = extractStreamingContent(
    text,
    "<ComponentExplanation>",
    "</ComponentExplanation>",
  );
  parsedData.componentName = extractStreamingContent(
    text,
    "<ComponentName>",
    "</ComponentName>",
  );
  parsedData.componentDescription = extractStreamingContent(
    text,
    "<ComponentDescription>",
    "</ComponentDescription>",
  );
  parsedData.componentKeywords = extractCompleteContent(
    text,
    "<ComponentKeywords>",
    "</ComponentKeywords>",
    "[]",
  );
  parsedData.componentProps = extractCompleteContent(
    text,
    "<ComponentProps>",
    "</ComponentProps>",
    "[]",
  );

  // Clean up code content
  let code = extractStreamingContent(
    text,
    "<ComponentCode>",
    "</ComponentCode>",
  );
  // Remove ```tsx and ``` markers if present
  code = code.replace(/^```tsx?\n/, "").replace(/\n```$/, "");
  parsedData.componentCode = code;

  return parsedData;
}

function extractStreamingContent(
  text: string,
  openTag: string,
  closeTag: string,
): string {
  const startIndex = text.lastIndexOf(openTag);
  if (startIndex === -1) return "";

  const endIndex = text.indexOf(closeTag, startIndex);
  if (endIndex === -1) {
    return text.slice(startIndex + openTag.length);
  }

  return text.slice(startIndex + openTag.length, endIndex).trim();
}

function extractCompleteContent(
  text: string,
  openTag: string,
  closeTag: string,
  defaultValue: string,
): string {
  const startIndex = text.indexOf(openTag);
  if (startIndex === -1) return defaultValue;

  const endIndex = text.lastIndexOf(closeTag);
  if (endIndex === -1) {
    return defaultValue;
  }

  return text.slice(startIndex + openTag.length, endIndex).trim();
}
