import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { ComponentCard } from "./component-card";

interface ComponentGridProps {
  components: ComponentWithStats[];
  isLoading: boolean;
  onCreateComponent: () => void;
}

export function ComponentGrid({
  components,
  isLoading,
  onCreateComponent,
}: ComponentGridProps) {
  const scopedT = useScopedI18n("component_library");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (components.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 gap-4">
        <Icons.Components className="w-12 h-12 text-gray-8" />
        <Text size="3" className="text-gray-11">
          {scopedT("empty_state")}
        </Text>
        <Button onClick={onCreateComponent}>
          <Icons.Plus className="w-4 h-4" />
          {scopedT("create_first")}
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {components.map((component) => (
        <ComponentCard
          key={component.id}
          component={component}
          lastUsed={
            component.last_used_at
              ? formatDistanceToNow(new Date(component.last_used_at))
              : undefined
          }
        />
      ))}
    </div>
  );
}
