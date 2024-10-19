import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import type { TemplateType } from "./types";

interface TemplateSlideProps {
  template: TemplateType;
  selected: boolean;
  onClick: () => void;
}

export const TemplateSlide: React.FC<TemplateSlideProps> = ({
  template,
  selected,
  onClick,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <div
      className={clsx(
        "relative rounded-lg p-2 border border-outline-02 hover:bg-gray-a3 cursor-pointer",
        { "border-green-10 bg-green-a3": selected },
      )}
      onClick={onClick}
      onKeyUp={onClick}
    >
      <div
        className="relative h-48 w-full flex flex-col justify-end rounded-md overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${template.screenshot})` }}
      />
      <div className="flex justify-between w-full pt-3">
        <Heading size="2" className="text-gray-12 truncate">
          {template.title}
        </Heading>
        <Button variant="ghost" color="gray" className="ml-2 flex-shrink-0">
          <Icons.Heart />
          <span className="ml-1">{template.likes}</span>
        </Button>
      </div>
    </div>
  </motion.div>
);
