import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

export const updateSession = async (
  request: NextRequest,
  response: NextResponse,
  {
    supabaseUrl,
    supabaseAnonKey,
  }: {
    supabaseUrl: string | undefined;
    supabaseAnonKey: string | undefined;
  },
) => {
  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }

        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // This is to ensure the session is updated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
};
