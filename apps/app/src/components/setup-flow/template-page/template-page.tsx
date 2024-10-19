import { useScopedI18n } from "@/locales/client";
import { Heading } from "@v1/ui/heading";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Text } from "@v1/ui/text";
import { useState } from "react";
import { templateDemoData } from "./demo-data";
import { TemplateSlide } from "./template-slide";
import type { TemplateType } from "./types";

export const TemplatePage = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => {
  const scopedT = useScopedI18n("setup");

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null,
  );

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <Heading size="9" className="pt-[10vh] pb-4">
        {scopedT("choose_template")}
      </Heading>
      <Text className="text-gray-10 mb-6" size="3">
        {scopedT("choose_template_description")}
      </Text>
      <ScrollArea className="relative w-full flex-grow pb-[100px]">
        <div
          style={{
            background:
              "linear-gradient(to bottom, var(--color-background), transparent)",
          }}
          className="absolute top-0 left-0 w-full h-10 z-10"
        />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
          style={{ maxWidth: "70vw", margin: "0 auto" }}
        >
          {templateDemoData.map((template) => (
            <TemplateSlide
              key={template.id}
              template={template}
              selected={selectedTemplate?.id === template.id}
              onClick={() => setSelectedTemplate(template)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
