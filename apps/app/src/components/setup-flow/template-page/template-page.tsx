import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { AnimatePresence, motion } from "framer-motion";
import type { TemplateType } from "../types";
import { EmptyTemplateSlide } from "./empty-template";
import { ExploreMoreButton } from "./explore-more";

type TemplatePageProps = {
  onPrev: () => void;
  onNext: () => void;
  selectedTemplate: TemplateType | null;
  setSelectedTemplate: (template: TemplateType | null) => void;
};

export const TemplatePage = ({
  onPrev,
  onNext,
  selectedTemplate,
  setSelectedTemplate,
}: TemplatePageProps) => {
  const scopedT = useScopedI18n("setup");

  const handleExploreMore = () => {
    // not implemented
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative w-full h-full flex gap-7 flex-col justify-center items-center">
      <Heading size="9">{scopedT("template_page_heading")}</Heading>
      <Text className="text-gray-10 mb-2" size="3">
        {scopedT("template_page_description")}
      </Text>
      <div
        className="flex justify-center gap-6"
        style={{ maxWidth: "70vw", margin: "0 auto" }}
      >
        <EmptyTemplateSlide
          selected={selectedTemplate === "empty"}
          onClick={() => setSelectedTemplate("empty")}
        />
        <ExploreMoreButton onClick={handleExploreMore} />
      </div>
      <div style={{ height: 60, marginTop: 20 }}>
        <AnimatePresence mode="wait">
          {selectedTemplate && (
            <motion.div
              key="next-button"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={onNext}
                size="3"
                className="w-full max-w-[300px]"
              >
                {scopedT("template_page_next_button")}
                <Icons.ArrowNarrowRight />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
