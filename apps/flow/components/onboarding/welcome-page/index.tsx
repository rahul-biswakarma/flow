import { useScopedI18n } from "@flow/locales/client";
import { Button, Heading, Text } from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";

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
