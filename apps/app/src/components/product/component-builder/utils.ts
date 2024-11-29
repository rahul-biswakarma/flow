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

  // Extract fields
  parsedData.explanation = extractStreamingContent(
    text,
    "<cb000>",
    "</cb000>",
  ).content;
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
  );
  parsedData.componentProps = extractCompleteContent(
    text,
    "<ComponentProps>",
    "</ComponentProps>",
    "[]",
  );

  // Clean up code content
  parsedData.componentCode = extractStreamingContent(
    text,
    "<cb005>",
    "</cb005>",
  );

  return parsedData;
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
  if (endIndex === -1) {
    return {
      content: text.slice(startIndex + openTag.length).trim(),
      status: "in-progress",
    };
  }

  return {
    content: text.slice(startIndex + openTag.length, endIndex).trim(),
    status: "complete",
  };
}

function extractStreamingStringArrayContent(
  text: string,
  openTag: string,
  closeTag: string,
): StreamParsedData<string[]> {
  const regex = new RegExp(`${openTag}(.+?)${closeTag}`, "g");
  const matches = text.match(regex);
  if (!matches) return { content: [], status: "not-started" };

  const result = matches.map((match) => {
    const startIndex = match.indexOf(openTag);
    const endIndex = match.lastIndexOf(closeTag);
    return match.slice(startIndex + openTag.length, endIndex).trim();
  });

  return {
    content: result,
    status: "complete",
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
  if (endIndex === -1) {
    return {
      content: text.slice(startIndex + openTag.length).trim(),
      status: "in-progress",
    };
  }

  return {
    content: text.slice(startIndex + openTag.length, endIndex).trim(),
    status: "complete",
  };
}
