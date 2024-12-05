import { useFlowContext } from "@/context";
import { TooltipProvider } from "@v1/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { NavigationBar } from "./sidebars/navigation-bar";

export const Product = () => {
  const { navigationBarMenuItems, activeNavBarItem } = useFlowContext();
  const activeItem = navigationBarMenuItems.find(
    (item) => item.key === activeNavBarItem,
  );

  const prevItem = useRef("nav-bar-visual-editor");
  const prevDirection = useRef(1);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const getDirection = (current: string, previous: string) => {
    const currentIndex = navigationBarMenuItems.findIndex(
      (item) => item.key === current,
    );
    const previousIndex = navigationBarMenuItems.findIndex(
      (item) => item.key === previous,
    );

    if (prevItem.current === current) {
      return prevDirection.current;
    }

    prevItem.current = current;
    prevDirection.current = currentIndex - previousIndex;

    // Moving to a later item (higher index) returns positive
    // Moving to an earlier item (lower index) returns negative
    return currentIndex - previousIndex;
  };

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
          <div className="flex h-full w-full max-h-full overflow-hidden relative">
            <AnimatePresence
              initial={false}
              custom={getDirection(activeNavBarItem, prevItem.current)}
            >
              <motion.div
                key={activeItem?.key}
                custom={getDirection(activeNavBarItem, prevItem.current)}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full"
              >
                {activeItem && (
                  <div className="flex h-full w-full max-h-full border rounded-sm bg-panel border-panel">
                    {activeItem.component}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </TooltipProvider>
    </motion.div>
  );
};
