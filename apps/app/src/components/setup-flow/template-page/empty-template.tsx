import { useScopedI18n } from "@/locales/client";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
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
        "relative w-[300px] rounded-lg p-2 border border-dashed border-outline-02 hover:bg-gray-a3 cursor-pointer group h-[240px]",
        {
          "border-green-10 bg-green-a3 hover:bg-green-a5": selected,
        },
      )}
      onClick={onClick}
      onKeyUp={onClick}
      role="button"
      tabIndex={0}
    >
      <div
        className={clsx(
          "relative h-full w-full flex flex-col justify-center items-center rounded-md overflow-hidden bg-gray-a2 group-hover:bg-gray-a4 gap-1 text-gray-10",
          {
            "bg-green-a3 group-hover:bg-green-a5 text-green-9 hover:text-green-11":
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
