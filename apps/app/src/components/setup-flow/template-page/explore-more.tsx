import { useScopedI18n } from "@/locales/client";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { motion } from "framer-motion";

interface ExploreMoreButtonProps {
  onClick: () => void;
}

export const ExploreMoreButton: React.FC<ExploreMoreButtonProps> = ({
  onClick,
}) => {
  const scopedT = useScopedI18n("setup");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className="relative rounded-lg p-2 border border-dashed border-outline-02 hover:bg-gray-a3 cursor-pointer group h-[240px]"
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
    </motion.div>
  );
};
