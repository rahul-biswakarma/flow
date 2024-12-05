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
      className="grid grid-cols-[auto_1fr] w-full h-full bg-product"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <TooltipProvider>
        <NavigationBar />
        <div className="w-full h-full p-2 pl-0 max-h-screen">
          <div className="w-full h-full border rounded-sm overflow-hidden bg-panel border-panel">
            {activeItem && (
              <div
                key={activeItem.key}
                className="flex h-full w-full max-h-full"
              >
                {activeItem.component}
              </div>
            )}
          </div>
        </div>
      </TooltipProvider>
    </motion.div>
  );
};
