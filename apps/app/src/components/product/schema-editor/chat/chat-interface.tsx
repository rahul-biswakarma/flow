import { AIChat } from "@v1/ai/ai-chat";
import { useCallback } from "react";
import { useSchemas } from "../use-schemas";
import type { DetectedSchema } from "./types";

export const ChatInterface = () => {
  const { createSchema, updateSchema } = useSchemas();

  const handleSchemaDetected = useCallback(
    (schema: DetectedSchema) => {
      const newSchema = createSchema();
      updateSchema({
        ...newSchema,
        name: schema.name,
        description: schema.description,
        fields: schema.fields.map((field) => ({
          ...field,
          id: crypto.randomUUID(),
        })),
      });
    },
    [createSchema, updateSchema],
  );

  const handleResponse = useCallback(
    async (e: Response) => {
      const message = await e.json();
      // Here you would implement schema detection logic
      // For now, we'll use a simple check
      if (message.content.toLowerCase().includes("schema")) {
        const mockSchema: DetectedSchema = {
          name: "User",
          description: "User schema detected from chat",
          fields: [
            {
              name: "username",
              type: "text",
              required: true,
              unique: true,
            },
            {
              name: "email",
              type: "text",
              required: true,
              unique: true,
            },
          ],
        };
        handleSchemaDetected(mockSchema);
      }
    },
    [handleSchemaDetected],
  );

  return (
    <AIChat
      title="Schema Assistant"
      placeholder="Describe your schema needs..."
      onResponse={handleResponse}
      onError={(error: unknown) => {
        console.error("Chat error:", error);
      }}
    />
  );
};
