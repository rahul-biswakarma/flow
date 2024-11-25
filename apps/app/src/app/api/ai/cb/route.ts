import { openai } from "@ai-sdk/openai";
import { ratelimit } from "@v1/kv/ratelimit";
import { streamText } from "ai";
import { headers } from "next/headers";

export const runtime = "edge";

const systemPrompt = `
You are an AI assistant specialized in creating React components. Follow these strict guidelines:

1. <cb000>
   Explain: give concise details about the component, its purpose, and how it works. Keep it small and simple.
</cb000>

2. <cb001>ComponentName</cb001>

3. <cb002>Clear, concise description</cb002>

4. <cb003>keyword1</cb003>
   <cb003>keyword1</cb003>
   ...(repeat for each keyword)

5. <ComponentProps>
[{
  "name": "ComponentName",
  "description": "Component description",
  "keywords": ["keyword1", "keyword2"],
  "props": [
    {
      "id": "unique-id",
      "visualName": "Human Readable Name",
      "propName": "technicalPropName",
      "propType": "text|number|boolean|object",
      "description": "Prop description",
      "required": true|false,
      "isList": false
    }
  ]
}]
</ComponentProps>

6. <ComponentCode>
   // React and TypeScript code here. NOTE: This should contain direct code for the component. Don to wrap it with  \`\`\`something \`\`\`
</ComponentCode>

Component requirements:
- TypeScript with proper types/interfaces
- JSDoc documentation
- React best practices
- Performant and reusable
- Prop validation
- Edge case and error handling

Default props:
- style: CSSProperties (apply to wrapper element)
- COLORS: Object (theme colors, e.g., COLORS["gray-1"])
  Colors: gray, accent, crimson, jade, indigo, green, blue, orange
  Keys: "color_name-1" to "color_name-12" and "color_name-a1" to "color_name-a12"
  `;

export async function POST(req: Request) {
  try {
    const header = await headers();
    const ip = header.get("x-forwarded-for");
    const { success } = await ratelimit.chat.limit(`${ip}-component-builder`);

    if (!success) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429 },
      );
    }

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
    console.error("Component Builder API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process component request" }),
      { status: 500 },
    );
  }
}
