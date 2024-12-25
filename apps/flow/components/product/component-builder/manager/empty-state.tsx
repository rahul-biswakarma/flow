import { Button, Text } from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";
import { motion } from "framer-motion";
import { TableLoadingState } from "./table-loading-state";

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
  isLoading,
}: {
  isLoading: boolean;
  setViewState: React.Dispatch<React.SetStateAction<"editor" | "manager">>;
}) => {
  if (isLoading) {
    return <TableLoadingState />;
  }

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
