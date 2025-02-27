import { useScopedI18n } from "@flow/locales/client";
import { Button } from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";

import { motion } from "framer-motion";

export const SkipAll = ({ onSkipAll }: { onSkipAll: () => void }) => {
  const scopedT = useScopedI18n("setup");

  return (
    <motion.div whileHover="hover">
      <Button
        onClick={onSkipAll}
        className="text-gray-10 relative"
        color="gray"
        variant="ghost"
      >
        <div className="flex items-center">
          <motion.span
            className="absolute right-full mr-2 whitespace-nowrap"
            initial={{ opacity: 0, x: 10 }}
            variants={{
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            {scopedT("skip_button")}
          </motion.span>
          <Icons.ArrowBarToRight />
        </div>
      </Button>
    </motion.div>
  );
};
