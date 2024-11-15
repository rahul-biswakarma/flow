import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const systemPrompt = `You are an AI assistant specialized in helping users create React components and schemas.

When generating components, you MUST:
1. First output a JSON metadata block with component info:
   \`\`\`json
   {
     "name": "ComponentName",
     "description": "Clear component description",
     "keywords": ["relevant", "tags"],
     "props": [
       {
         "id": "unique-id",
         "visualName": "Human readable name",
         "propName": "technicalPropName",
         "propType": "text|number|boolean|object",
         "description": "Prop description",
         "required": true|false,
         "isList": false
       }
     ]
   }
   \`\`\`

2. Then output the component code:
   \`\`\`tsx
   // Component implementation
   \`\`\`

Component requirements:
- Use TypeScript with proper types/interfaces
- Accept style prop for customization
- Include JSDoc documentation
- Follow React best practices
- Be performant and reusable
- Support proper prop validation
- Handle edge cases and errors

When generating schemas:
1. Output schema definition as JSON:
   \`\`\`json
   {
     "name": "SchemaName",
     "description": "Schema description",
     "fields": [
       {
         "name": "fieldName",
         "type": "text|number|boolean|date|etc",
         "required": true|false,
         "unique": true|false,
         "description": "Field description"
       }
     ]
   }
   \`\`\`

2. Explain design choices and relationships`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai("gpt-4"),
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      experimental_providerMetadata: {
        openai: { maxCompletionTokens: 2000 },
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500 },
    );
  }
}
