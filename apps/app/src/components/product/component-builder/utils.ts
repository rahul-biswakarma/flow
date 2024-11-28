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
  parsedData.explanation = extractStreamingContent(text, "<cb000>", "</cb000>");
  parsedData.componentName = extractStreamingContent(
    text,
    "<cb001>",
    "</cb001>",
  );
  parsedData.componentDescription = extractStreamingContent(
    text,
    "<cb002>",
    "</cb002>",
  );
  parsedData.componentKeywords = extractCompleteContent(
    text,
    "<cb003>",
    "</cb003>",
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

export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function extractLastKeyword(keywords: string): string | null {
  try {
    const keywordsArray = JSON.parse(keywords);
    if (Array.isArray(keywordsArray) && keywordsArray.length > 0) {
      return keywordsArray[keywordsArray.length - 1];
    }
  } catch (e) {
    // If the JSON is incomplete, try to extract the last keyword
    const match = keywords.match(/"([^"]+)"(?=[,\]]?\s*$)/);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
}
