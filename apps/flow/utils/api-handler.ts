import { ratelimit } from "@ren/kv/ratelimit";
import { headers } from "next/headers";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type ApiHandler<T> = (payload: any) => Promise<T>;

export function createApiHandler<T>(
  handler: ApiHandler<T>,
  rateLimitKey: string,
  errorMessage: string,
) {
  return async function POST(req: Request) {
    try {
      const header = await headers();
      const ip = header.get("x-forwarded-for");
      const { success } = await ratelimit.chat.limit(`${ip}-${rateLimitKey}`);

      if (!success) {
        return new Response(
          JSON.stringify({
            error: "Too many requests. Please try again later.",
          }),
          { status: 429 },
        );
      }

      const payload = await req.json();
      const data = await handler(payload);

      if (!data) {
        return new Response(JSON.stringify({ error: errorMessage }), {
          status: 500,
        });
      }

      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error(`${rateLimitKey} API error:`, error);
      return new Response(
        JSON.stringify({ error: `Failed to process ${rateLimitKey} request` }),
        { status: 500 },
      );
    }
  };
}
