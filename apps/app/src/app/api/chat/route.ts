import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const systemPrompt = `You are an AI assistant specialized in helping users design database schemas.
Your role is to:
1. Analyze user requests for database schema needs
2. Suggest appropriate schema structures
3. Explain your reasoning for schema design choices
4. Help users optimize their schema designs
5. Provide examples and best practices

When suggesting schemas:
- Use clear, descriptive field names
- Include appropriate data types
- Consider relationships between entities
- Suggest indexes and constraints where appropriate
- Explain your choices in simple terms`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
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
