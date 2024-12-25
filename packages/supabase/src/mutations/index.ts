import { logger } from "@ren/logger";
import { createSupabaseClient } from "../clients/server";

export async function updateUser(
  userId: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any,
  options?: {
    supabaseUrl: string | undefined;
    supabaseAnonKey: string | undefined;
  },
) {
  const supabase = await createSupabaseClient({
    supabaseUrl: options?.supabaseUrl,
    supabaseAnonKey: options?.supabaseAnonKey,
  });

  try {
    const result = await supabase.from("users").update(data).eq("id", userId);

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}
