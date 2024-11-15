"use client";

import { createSupabaseClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";

export function GoogleSignin() {
  const supabase = createSupabaseClient();

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
