import { useScopedI18n } from "@/locales/client";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

export const BackgroundGradientAnimation = dynamic(
  () =>
    import("@v1/ui/background-gradient-animation").then(
      (mod) => mod.BackgroundGradientAnimation,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-screen relative overflow-hidden top-0 left-0" />
    ),
  },
);

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
