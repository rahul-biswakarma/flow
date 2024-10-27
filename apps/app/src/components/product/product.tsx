import { motion } from "framer-motion";
import { NavigationBar } from "./sidebars/navigation-bar";

export const Product = () => {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <NavigationBar />
    </motion.div>
  );
};
