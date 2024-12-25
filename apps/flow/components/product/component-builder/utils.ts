import type { StreamDataStatus } from "./types";

type StreamParsedData<T> = {
  content: T;
  status: StreamDataStatus;
};

interface ParsedFields {
  explanation: string;
  componentName: StreamParsedData<string>;
  componentDescription: StreamParsedData<string>;
  componentKeywords: StreamParsedData<string[]>;
  componentProps: StreamParsedData<string>;
  componentCode: StreamParsedData<string>;
}

function generateExplanationText(parsedData: ParsedFields): string {
  if (
    parsedData.componentName.status === "not-started" &&
    parsedData.componentDescription.status === "not-started" &&
    parsedData.componentKeywords.status === "not-started" &&
    parsedData.componentProps.status === "not-started" &&
    parsedData.componentCode.status === "not-started"
  ) {
    return "";
  }

  const steps = [
    {
      field: "componentName",
      text: "Component name",
      status: parsedData.componentName.status,
    },
    {
      field: "componentDescription",
      text: "Description",
      status: parsedData.componentDescription.status,
    },
    {
      field: "componentKeywords",
      text: "Keywords",
      status: parsedData.componentKeywords.status,
    },
    {
      field: "componentProps",
      text: "Props interface",
      status: parsedData.componentProps.status,
    },
    {
      field: "componentCode",
      text: "Implementation",
      status: parsedData.componentCode.status,
    },
  ];

  const getStatusSymbol = (status: StreamDataStatus): string => {
    const symbols = {
      complete: "✓",
      "in-progress": "●",
      "not-started": "○",
    };

    const symbol = symbols[status] || symbols["not-started"];
    return symbol;
  };

  // Find the longest task text for padding
  const maxLength = Math.max(...steps.map((step) => step.text.length));

  const stepsText = steps
    .map((step) => {
      const statusSymbol = getStatusSymbol(step.status);
      const paddedText = step.text.padEnd(maxLength, " ");
      return `${statusSymbol} ${paddedText}`;
    })
    .join("\n");

  return `
${stepsText}
`;
}

export function parseAIResponse(response: string): ParsedFields {
  const parsedData: ParsedFields = {
    explanation: "",
    componentName: {
      content: "",
      status: "not-started",
    },
    componentDescription: {
      content: "",
      status: "not-started",
    },
    componentKeywords: {
      content: [],
      status: "not-started",
    },
    componentProps: {
      content: "",
      status: "not-started",
    },
    componentCode: {
      content: "",
      status: "not-started",
    },
  };

  const text = response.toString();

  // Extract explanation content
  const explanationContent = extractStreamingContent(
    text,
    "<cb000>",
    "</cb000>",
  ).content;

  // If only explanation exists (no other tags), return early with just the explanation
  if (
    !text.includes("<cb001>") &&
    !text.includes("<cb002>") &&
    !text.includes("<cb003>") &&
    !text.includes("<cb004>") &&
    !text.includes("<cb005>")
  ) {
    parsedData.explanation = explanationContent;
    return parsedData;
  }

  // Continue with existing parsing logic for component generation
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
  parsedData.componentKeywords = extractStreamingStringArrayContent(
    text,
    "<cb003>",
    "</cb003>",
    "<cb004>",
  );
  parsedData.componentProps = extractCompleteContent(
    text,
    "<cb004>",
    "</cb004>",
    "[]",
  );
  parsedData.componentCode = extractStreamingContent(
    text,
    "<cb005>",
    "</cb005>",
  );

  // Only generate explanation text with steps if we're creating a component
  const generatedExplanation = generateExplanationText(parsedData);
  parsedData.explanation = `${explanationContent}\n${generatedExplanation}`;

  return parsedData;
}

function hasPartialTags(content: string): boolean {
  const partialTagPattern = /<\/?cb\d{3}/;
  return partialTagPattern.test(content);
}

function extractStreamingContent(
  text: string,
  openTag: string,
  closeTag: string,
): {
  content: string;
  status: StreamDataStatus;
} {
  const startIndex = text.lastIndexOf(openTag);
  if (startIndex === -1)
    return {
      content: "",
      status: "not-started",
    };

  const endIndex = text.indexOf(closeTag, startIndex);
  let content = "";
  let status: StreamDataStatus = "not-started";

  if (endIndex === -1) {
    content = text.slice(startIndex + openTag.length).trim();
    status = "in-progress";
  } else {
    content = text.slice(startIndex + openTag.length, endIndex).trim();
    status = "complete";
  }

  // Clean up any remaining tags
  content = content
    .replace(new RegExp(openTag, "g"), "")
    .replace(new RegExp(closeTag.replace("/", "\\/"), "g"), "")
    .trim();

  // Check for partial tags and update status if needed
  if (status === "complete" && hasPartialTags(content)) {
    status = "in-progress";
  }

  return { content, status };
}

function extractStreamingStringArrayContent(
  text: string,
  openTag: string,
  closeTag: string,
  nextTag?: string,
): StreamParsedData<string[]> {
  const regex = new RegExp(`${openTag}(.+?)${closeTag}`, "g");
  const matches = text.match(regex);
  if (!matches) return { content: [], status: "not-started" };

  const result = matches.map((match) => {
    const startIndex = match.indexOf(openTag);
    const endIndex = match.lastIndexOf(closeTag);
    return match.slice(startIndex + openTag.length, endIndex).trim();
  });

  if (nextTag) {
    const regex = new RegExp(`${nextTag}`, "g");
    const nextMatches = text.match(regex);
    if (nextMatches) return { content: result, status: "complete" };
  }

  return {
    content: result,
    status: "in-progress",
  };
}

function extractCompleteContent(
  text: string,
  openTag: string,
  closeTag: string,
  defaultValue: string,
): StreamParsedData<string> {
  const startIndex = text.indexOf(openTag);
  if (startIndex === -1) {
    return {
      content: defaultValue,
      status: "not-started",
    };
  }

  const endIndex = text.lastIndexOf(closeTag);
  let content = "";
  let status: StreamDataStatus = "not-started";

  if (endIndex === -1) {
    content = text.slice(startIndex + openTag.length).trim();
    status = "in-progress";
  } else {
    content = text.slice(startIndex + openTag.length, endIndex).trim();
    status = "complete";
  }

  // Clean up any remaining tags
  content = content
    .replace(new RegExp(openTag, "g"), "")
    .replace(new RegExp(closeTag.replace("/", "\\/"), "g"), "")
    .trim();

  // Check for partial tags and update status if needed
  if (status === "complete" && hasPartialTags(content)) {
    status = "in-progress";
  }

  return { content, status };
}
