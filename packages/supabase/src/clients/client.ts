import { createBrowserClient } from "@supabase/ssr";

export const createSupabaseClient = ({
  supabaseUrl,
  supabaseAnonKey,
}: {
  supabaseUrl: string | undefined;
  supabaseAnonKey: string | undefined;
}) => createBrowserClient(supabaseUrl!, supabaseAnonKey!);
