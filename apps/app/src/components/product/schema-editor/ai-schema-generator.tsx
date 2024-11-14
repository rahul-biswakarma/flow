import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextArea } from "@v1/ui/text-area";
import { useState } from "react";
import type { Schema } from "./types";

interface AISchemaGeneratorProps {
  onGenerate: (schema: Partial<Schema>) => void;
}

export const AISchemaGenerator = ({ onGenerate }: AISchemaGeneratorProps) => {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);

    // This is a mock implementation. In a real app, you would:
    // 1. Call your AI service endpoint
    // 2. Process the response
    // 3. Convert it to a schema structure
    setTimeout(() => {
      const mockSchema: Partial<Schema> = {
        name: "Blog Post",
        description: "A schema for blog posts",
        fields: [
          {
            id: "1",
            name: "title",
            type: "text",
            required: true,
            unique: true,
            description: "The title of the blog post",
          },
          {
            id: "2",
            name: "content",
            type: "rich-text",
            required: true,
            unique: false,
            description: "The main content of the blog post",
          },
          {
            id: "3",
            name: "publishedAt",
            type: "date",
            required: false,
            unique: false,
            description: "When the post was published",
          },
        ],
      };

      onGenerate(mockSchema);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Text>
        Describe your schema in plain English and our AI will help you create
        it.
      </Text>
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Example: I need a blog post schema with a title, content, and publication date. The title should be unique and required."
        className="h-32"
      />
      <div className="flex justify-end gap-2">
        <Button
          disabled={!description.trim() || isGenerating}
          onClick={handleGenerate}
        >
          {isGenerating ? (
            <Icons.Loader className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Icons.Bot className="w-4 h-4 mr-2" />
          )}
          Generate Schema
        </Button>
      </div>
    </div>
  );
};
