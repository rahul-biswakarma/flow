import { useFlowContext } from "@/context";
import { TooltipProvider } from "@v1/ui/tooltip";
import { motion } from "framer-motion";
import { NavigationBar } from "./sidebars/navigation-bar";

export const Product = () => {
  const { navigationBarMenuItems, activeNavBarItem } = useFlowContext();
  const activeItem = navigationBarMenuItems.find(
    (item) => item.key === activeNavBarItem,
  );

  return (
    <motion.div
      className="grid grid-cols-[auto_1fr] w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <TooltipProvider>
        <NavigationBar />
        {activeItem && (
          <div key={activeItem.key} className="flex h-full w-full">
            {activeItem.component}
          </div>
        )}
      </TooltipProvider>
    </motion.div>
  );
};
