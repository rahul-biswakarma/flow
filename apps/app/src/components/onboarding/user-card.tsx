import { useScopedI18n } from "@/locales/client";
import type { User } from "@/types";
import { Text } from "@v1/ui/text";
import { SignOut } from "../sign-out";

export const OnboardingUserCard = ({ userData }: { userData: User }) => {
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
