import { countComponentsByStatus } from "@flow/data-layer/queries/server";
import { ratelimit } from "@ren/kv/ratelimit";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const header = await headers();
    const ip = header.get("x-forwarded-for");
    const { success } = await ratelimit.chat.limit(`${ip}-components-list`);

    if (!success) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429 },
      );
    }

    const payload = await req.json();
    const data = await countComponentsByStatus(
      payload.projectId,
      payload.status || undefined,
    );

    if (!(data >= 0)) {
      return new Response(
        JSON.stringify({ error: "Failed to count components" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("components.count API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process components.count request" }),
      { status: 500 },
    );
  }
}
