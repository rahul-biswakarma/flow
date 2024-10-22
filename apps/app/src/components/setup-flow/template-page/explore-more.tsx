import { useScopedI18n } from "@/locales/client";
import { BackgroundGradientAnimation } from "@v1/ui/background-gradient-animation";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";

interface ExploreMoreButtonProps {
  onClick: () => void;
}

export const ExploreMoreButton: React.FC<ExploreMoreButtonProps> = ({
  onClick,
}) => {
  const scopedT = useScopedI18n("setup");

  return (
    <div
      className="relative p-2 rounded-lg border border-dashed border-outline-03 w-[300px] hover:bg-gray-a3 cursor-pointer group h-[240px]"
      onClick={onClick}
      onKeyUp={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative h-full w-full flex flex-col justify-center items-center rounded-md overflow-hidden bg-gray-a2 group-hover:bg-gray-a4 gap-2 text-gray-12">
        <BackgroundGradientAnimation containerClassName="!absolute !w-full !h-full" />
        <Icons.Search className="w-8 h-8 z-10" />
        <Text className="z-10" size="2">
          {scopedT("explore_more_templates")}
        </Text>
      </div>
    </div>
  );
};
