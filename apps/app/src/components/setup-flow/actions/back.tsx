import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { motion } from "framer-motion";

export const SetupBackButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  const scopedT = useScopedI18n("setup");

  return (
    <motion.div whileHover="hover">
      <Button
        onClick={onClick}
        color="gray"
        className="text-gray-10 relative"
        variant="ghost"
      >
        <div className="flex items-center">
          <Icons.ArrowLeft />
          <motion.span
            className="absolute left-full ml-2 whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            variants={{
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            {scopedT("back_button")}
          </motion.span>
        </div>
      </Button>
    </motion.div>
  );
};
