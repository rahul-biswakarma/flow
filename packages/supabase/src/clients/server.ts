import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createSupabaseClient = async ({
  supabaseUrl,
  supabaseAnonKey,
}: {
  supabaseUrl: string | undefined;
  supabaseAnonKey: string | undefined;
}) => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {}
      },
    },
  });
};
