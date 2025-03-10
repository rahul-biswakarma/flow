import { useScopedI18n } from "@flow/locales/client";
import { Text } from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";
import { clsx } from "clsx";

interface EmptyTemplateSlideProps {
  selected: boolean;
  onClick: () => void;
}

export const EmptyTemplateSlide: React.FC<EmptyTemplateSlideProps> = ({
  selected,
  onClick,
}) => {
  const scopedT = useScopedI18n("setup");

  return (
    <div
      className={clsx(
        "relative w-[300px] rounded-lg p-2 border border-dashed border-outline-03 hover:bg-gray-a3 cursor-pointer group h-[240px]",
        {
          "!border-green-7 bg-green-a2 hover:bg-green-a3": selected,
        },
      )}
      onClick={onClick}
      onKeyUp={onClick}
    >
      <div
        className={clsx(
          "relative h-full w-full flex flex-col justify-center items-center rounded-md overflow-hidden bg-gray-a2 group-hover:bg-gray-a4 gap-1 text-gray-12",
          {
            "bg-green-a2 group-hover:bg-green-a3 text-green-9 hover:text-green-11":
              selected,
          },
        )}
      >
        <Icons.Sparkles />
        <Text size="2">{scopedT("start_from_scratch")}</Text>
      </div>
    </div>
  );
};
