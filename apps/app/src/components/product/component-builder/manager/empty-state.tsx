import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};
export const ComponentListEmpty = ({
  setViewState,
}: {
  setViewState: React.Dispatch<React.SetStateAction<"editor" | "manager">>;
}) => {
  return (
    <div className="flex w-full h-full items-center justify-center pb-20">
      <motion.div
        variants={itemVariants}
        className="w-full max-w-[500px] border border-dashed border-gray-4 bg-surface rounded-base"
      >
        <div className="flex flex-col gap-0.5 justify-center items-center py-8 h-full min-h-[200px] ">
          <Text size="3">No component available</Text>
          <Text className="text-gray-10" size="2" highContrast={false}>
            Create a new component using our AI to get started
          </Text>
          <Button
            onClick={() => {
              setViewState("editor");
            }}
            className="mt-6"
            variant="soft"
          >
            <Icons.Plus />
            Create component now
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
