import { logger } from "@ren/logger";
import { createSupabaseClient } from "../clients/server";
import type { TablesUpdate } from "../types";

export async function updateUser(
  userId: string,
  data: TablesUpdate<"users">,
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
