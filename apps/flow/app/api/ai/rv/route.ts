import { openai } from "@ai-sdk/openai";
import { ratelimit } from "@ren/kv/ratelimit";
import { streamText } from "ai";
import { headers } from "next/headers";
export const runtime = "edge";

const systemPrompt = `
React Component Review Prompt

Key Areas to Review
1. Framework Use : Ensure the component is built using the React framework.
2. Export Type : Check if the component is exported as a default export.
3. Radix UI Integration : Verify that Radix UI elements are used and are consistent with the theme setup.
4. Props for Style Modifications : Confirm that there is a style prop (props.style) that accepts custom styles and applies them to the component's main element.
5. Spot any errors in the code and provide feedback on how to fix them.

NOTE: After reviewing the code, if not critical issue is found generate a good job message with some feedback else provide FEEDBACK on what can be improved.
PS: GENERATE RESPONSE IN HTML IN NOT MORE THAN 1000 TOKEN.
ALSO DO NOT INCLUDE ANY CODE IN THE RESPONSE.
ALSO IF EVERYTHING IS OKAY, ADD A data-good-job="true" ATTRIBUTE TO THE RESPONSE.
`;

export async function POST(req: Request) {
  try {
    const header = await headers();
    const ip = header.get("x-forwarded-for");
    const { success } = await ratelimit.chat.limit(`${ip}-ai`);

    if (!success) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429 },
      );
    }

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
    console.error("Component Review API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process component review" }),
      { status: 500 },
    );
  }
}
