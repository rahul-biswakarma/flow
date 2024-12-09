import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { motion } from "framer-motion";
import type { GenerationStatus } from "../../types";

interface GenerationStatusProps {
  status: GenerationStatus;
}

export const GenerationStatusIndicator = ({
  status,
}: GenerationStatusProps) => {
  if (!status.isGenerating && !Object.values(status.completed).some(Boolean)) {
    return null;
  }

  return (
    <div className="absolute bottom-[72px] left-0 right-0 bg-gray-2 border-t border-outline-02 p-3">
      <div className="flex flex-col gap-2">
        {Object.entries(status.completed).map(([key, isComplete]) => {
          const isCurrent = status.current === key;
          if (!isComplete && !isCurrent) return null;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              {isCurrent ? (
                <Icons.Loader className="w-4 h-4 animate-spin text-accent-9" />
              ) : (
                <Icons.Check className="w-4 h-4 text-green-9" />
              )}
              <Text size="1" className="capitalize">
                Generating {key}...
              </Text>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
