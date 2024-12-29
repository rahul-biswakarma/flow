import { ComponentPreview } from "@flow/components/preview";
import { Card, HoverCard, Text } from "@ren/ui/components";

export const ComponentListItem = () => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Card>Hello</Card>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <div>
          <Text>Preview</Text>
          <ComponentPreview />
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};
