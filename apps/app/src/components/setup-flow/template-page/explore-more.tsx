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
      className="relative p-2 [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-lg border border-transparent animate-border w-[300px] hover:bg-gray-a3 cursor-pointer group h-[240px]"
      onClick={onClick}
      onKeyUp={onClick}
      role="button"
      tabIndex={0}
    >
      He4lo
      <div className="relative h-full w-full flex flex-col justify-center items-center rounded-md overflow-hidden bg-gray-a2 group-hover:bg-gray-a4 gap-2 text-gray-10">
        <Icons.Search className="w-8 h-8" />
        <Text size="2">{scopedT("explore_more_templates")}</Text>
      </div>
    </div>
  );
};
