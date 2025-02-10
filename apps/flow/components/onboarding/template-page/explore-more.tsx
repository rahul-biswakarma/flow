import { useScopedI18n } from "@flow/locales/client";
import { Text } from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";
import { useTheme } from "next-themes";

interface ExploreMoreButtonProps {
  onClick: () => void;
}

export const ExploreMoreButton: React.FC<ExploreMoreButtonProps> = ({
  onClick,
}) => {
  const scopedT = useScopedI18n("setup");
  const { resolvedTheme } = useTheme();

  return (
    <div
      className="relative p-2 rounded-lg border border-dashed border-outline-03 w-[300px] hover:bg-gray-a3 cursor-pointer group h-[240px]"
      onClick={onClick}
      onKeyUp={onClick}
    >
      <div className="relative h-full w-full rounded-md overflow-hidden bg-gray-a2 group-hover:bg-gray-a4">
        <div
          className="flex flex-col justify-center items-center h-full w-full absolute gap-2"
          style={{
            background: `url(${resolvedTheme === "dark" ? "/globe.svg" : "/globe-light.svg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Icons.Search className="w-8 h-8 z-10" />
          <Text className="z-10" size="2">
            {scopedT("explore_more_templates")}
          </Text>
        </div>
      </div>
    </div>
  );
};
