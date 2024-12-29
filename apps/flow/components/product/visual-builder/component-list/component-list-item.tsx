import { ComponentPreview } from "@flow/components/preview";
import { Card, HoverCard, Text } from "@ren/ui/components";
import type { StyleData } from "@ren/ui/panels";
import type { PropSchema } from "../../component-builder/types";

export const ComponentListItem = ({
  componentName,
  componentCode,
  styleValue,
  propsValue,
}: {
  componentName: string;
  componentCode: string;
  styleValue: StyleData;
  propsValue: PropSchema[];
}) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Card>{componentName}</Card>
      </HoverCard.Trigger>
      <HoverCard.Content className="p-0">
        <div className="flex flex-col gap-2">
          <Text className="bg-gray-a2 border-b border-gray-6 px-3 py-2 min-w-36">
            Preview
          </Text>
          <ComponentPreview
            {...{
              componentCode,
              styleValue,
              componentProps: propsValue,
            }}
          />
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};
