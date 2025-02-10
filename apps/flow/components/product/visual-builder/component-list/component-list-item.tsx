import { ComponentPreview } from "@flow/components/preview";
import { Card, HoverCard, Text } from "@ren/ui/components";
import type { StyleData } from "@ren/ui/panels";
import { useDrag } from "react-dnd";
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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: {
      type: "new-component",
      componentCode,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move"
    >
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
    </div>
  );
};
