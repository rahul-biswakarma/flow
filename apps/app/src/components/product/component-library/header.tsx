import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";

interface ComponentLibraryHeaderProps {
  onCreateComponent: () => void;
  componentsCount: number;
}

export function ComponentLibraryHeader({
  onCreateComponent,
  componentsCount,
}: ComponentLibraryHeaderProps) {
  const scopedT = useScopedI18n("component_library");

  return (
    <div className="flex justify-between items-center p-4 border-b border-panel">
      <div className="flex flex-col">
        <Text size="4" weight="medium">
          {scopedT("title")}
        </Text>
        <Text size="2" className="text-gray-11">
          {scopedT("component_count", { count: componentsCount })}
        </Text>
      </div>
      <Button onClick={onCreateComponent}>
        <Icons.Plus className="w-4 h-4" />
        {scopedT("create_new")}
      </Button>
    </div>
  );
}
