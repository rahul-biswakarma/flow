import type { User } from "@flow/data-layer/types";
import { useScopedI18n } from "@flow/locales/client";
import { Text } from "@ren/ui/components";
import { SignOut } from "../auth/sign-out";

export const ProjectHeaderUserCard = ({ userData }: { userData: User }) => {
  const scopedT = useScopedI18n("onboarding");

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-end">
        <Text className="text-gray-11" size="1">
          {scopedT("logged_in_as")}
        </Text>
        <Text size="1">{userData.email}</Text>
      </div>
      <SignOut iconOnly />
    </div>
  );
};
