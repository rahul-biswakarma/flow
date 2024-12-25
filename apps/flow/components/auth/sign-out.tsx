"use client";

import { useI18n } from "@flow/locales/client";
import { supabaseOption } from "@flow/utils/supabase";
import { createSupabaseClient } from "@ren/supabase/client";
import { Button, IconButton } from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";
import { useRouter } from "next/navigation";

export function SignOut({ iconOnly = false }: { iconOnly?: boolean }) {
  const supabase = createSupabaseClient(supabaseOption);
  const t = useI18n();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (iconOnly) {
    return (
      <IconButton
        onClick={handleSignOut}
        variant="soft"
        color="crimson"
        className="gap-2 flex items-center"
      >
        <Icons.SignOut className="size-4" />
      </IconButton>
    );
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="soft"
      className="gap-2 flex items-center"
    >
      <Icons.SignOut className="size-4" />
      <span>{t("onboarding.sign_out")}</span>
    </Button>
  );
}
