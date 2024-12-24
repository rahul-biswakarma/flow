"use client";
import { createSupabaseClient } from "@ren/supabase/client";
import { Button } from "@ren/ui/components";

export function GoogleSignin() {
  const supabase = createSupabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  console.log("test", window.location.origin);

  const handleSignin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleSignin} variant="soft" className="font-mono">
      Sign in with Google
    </Button>
  );
}
