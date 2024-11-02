import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";

export const ComponentBuilderHeader = ({
  isConfigValid,
}: {
  isConfigValid: boolean;
}) => {
  const scopedT = useScopedI18n("component_builder");
  return (
    <div className="flex justify-between items-center gap-2 py-4 px-6 border-b border-outline-02">
      <div className="flex gap-4 items-center">
        <IconButton variant="ghost" size="1" color="gray">
          <Icons.ArrowLeft />
        </IconButton>
        <Text size="4">{scopedT("title")}</Text>
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button disabled={!isConfigValid} variant="surface">
          {scopedT("publish")}
        </Button>
      </div>
    </div>
  );
};
