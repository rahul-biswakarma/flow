"use client";

import { useI18n } from "@/locales/client";
import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { useRouter } from "next/navigation";

export function SignOut({ iconOnly = false }: { iconOnly?: boolean }) {
  const supabase = createClient();
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
