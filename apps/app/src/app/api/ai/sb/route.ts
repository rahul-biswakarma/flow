import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const systemPrompt = `You are an AI assistant specialized in helping users create database schemas.

When generating schemas:
1. Output schema definition as JSON:
   \`\`\`json
   {
     "name": "SchemaName",
     "description": "Schema description",
     "fields": [
       {
         "name": "fieldName",
         "type": "text|number|boolean|date|reference|array|object|rich-text|image|file",
         "required": true|false,
         "unique": true|false,
         "description": "Field description",
         "validation": {
           "min": number,
           "max": number,
           "pattern": "regex pattern"
         },
         "reference": {
           "schema": "ReferencedSchema",
           "field": "referencedField"
         }
       }
     ],
     "timestamps": true|false,
     "softDelete": true|false
   }
   \`\`\`

2. Explain design choices and relationships

Requirements:
- Use clear, descriptive field names
- Include proper data types
- Add validation rules where appropriate
- Consider relationships between schemas
- Follow database best practices
- Include proper indexing suggestions`;

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
    console.error("Schema Builder API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process schema request" }),
      { status: 500 },
    );
  }
}
