import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { SegmentedControl } from "@v1/ui/segmented-control";
import { Text } from "@v1/ui/text";

export const ThemePage = ({ onNext }: { onNext: () => void }) => {
  const scopedT = useScopedI18n("setup");
  return (
    <div className="w-full h-full flex flex-col gap-7 justify-center items-center">
      <Heading size="9">{scopedT("theme_page_heading")}</Heading>
      <Text className="text-gray-10" size="3">
        {scopedT("theme_page_description")}
      </Text>
      <SegmentedControl.Root>
        <SegmentedControl.Item className="w-[300px] h-[300px]" value="inbox">
          Inbox
        </SegmentedControl.Item>
        <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
      </SegmentedControl.Root>
      <Button onClick={onNext} size="3" className="w-full max-w-[300px]">
        {scopedT("theme_page_next_button")}
        <Icons.MoveRight />
      </Button>
    </div>
  );
};
