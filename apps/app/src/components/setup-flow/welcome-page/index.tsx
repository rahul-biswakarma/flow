import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";

export const WelcomePage = ({ onNext }: { onNext: () => void }) => {
  const scopedT = useScopedI18n("setup");
  return (
    <div className="w-full h-full flex flex-col gap-7 justify-center items-center">
      <Heading size="9">{scopedT("welcome", { projectName: "Flow" })}</Heading>
      <Text className="text-gray-10" size="3">
        {scopedT("welcome_description")}
      </Text>
      <Button onClick={onNext} size="3" className="w-full max-w-[300px]">
        {scopedT("get_started")}
        <Icons.ArrowNarrowRight />
      </Button>
    </div>
  );
};
