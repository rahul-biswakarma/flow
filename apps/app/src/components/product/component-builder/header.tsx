import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";

export const ComponentBuilderHeader = ({
  isConfigValid,
}: {
  isConfigValid: boolean;
}) => {
  const scopedT = useScopedI18n("component_builder");
  return (
    <div className="flex justify-between items-center gap-2 py-4 px-6 border-b border-outline-01">
      <Heading size="3">{scopedT("title")}</Heading>
      <div className="flex justify-end items-center gap-2">
        <Button disabled={!isConfigValid} variant="surface">
          {scopedT("publish")}
        </Button>
      </div>
    </div>
  );
};
