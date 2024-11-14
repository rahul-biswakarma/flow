import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import type { Message } from "ai";
import { useState } from "react";
import { SchemaDetector } from "./schema-detector";
import type { DetectedSchema } from "./types";

interface ChatMessageProps {
  message: Message;
  isLastMessage: boolean;
  onSchemaDetected: (schemas: DetectedSchema[]) => void;
}

export const ChatMessage = ({
  message,
  isLastMessage,
  onSchemaDetected,
}: ChatMessageProps) => {
  const [detectedSchemas, setDetectedSchemas] = useState<DetectedSchema[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSchemaDetection = (schemas: DetectedSchema[]) => {
    if (schemas.length > 0) {
      setDetectedSchemas(schemas);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      onSchemaDetected(detectedSchemas);
    } catch (error) {
      console.error("Error generating schemas:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card
      className={`p-4 ${
        message.role === "assistant" ? "bg-accent-3" : "bg-gray-3"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {message.role === "assistant" ? (
            <Icons.TopologyStar3 className="w-4 h-4" />
          ) : (
            <Icons.User className="w-4 h-4" />
          )}
          <Text size="2" weight="medium">
            {message.role === "assistant" ? "AI Assistant" : "You"}
          </Text>
        </div>

        <Text className="whitespace-pre-wrap">{message.content}</Text>

        {isLastMessage && message.role === "assistant" && (
          <SchemaDetector
            content={message.content}
            onSchemaDetected={handleSchemaDetection}
          />
        )}

        {detectedSchemas.length > 0 && (
          <div className="mt-2 flex flex-col gap-2">
            <Text size="2" weight="medium">
              {detectedSchemas.length} schema
              {detectedSchemas.length > 1 ? "s" : ""} detected
            </Text>
            <Button onClick={handleGenerate} disabled={isGenerating} size="1">
              {isGenerating ? (
                <Icons.Loader className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Icons.Sparkles className="w-4 h-4 mr-2" />
              )}
              Generate Schema{detectedSchemas.length > 1 ? "s" : ""}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
