import { useScopedI18n } from "@/locales/client";
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
      className="relative rounded-lg p-2 border border-dashed border-outline-02 w-[300px] hover:bg-gray-a3 cursor-pointer group h-[240px]"
      onClick={onClick}
      onKeyUp={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative h-full w-full flex flex-col justify-center items-center rounded-md overflow-hidden bg-gray-a2 group-hover:bg-gray-a4 gap-2 text-gray-10">
        <Icons.Search className="w-8 h-8" />
        <Text size="2">{scopedT("explore_more_templates")}</Text>
      </div>
    </div>
  );
};
