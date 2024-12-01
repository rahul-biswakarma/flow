import { useScopedI18n } from "@/locales/client";
import type { ComponentWithStats } from "@v1/supabase/types/component";
import { Badge } from "@v1/ui/badge";
import { Card } from "@v1/ui/card";
import { DropdownMenu } from "@v1/ui/dropdown";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";

interface ComponentCardProps {
  component: ComponentWithStats;
  lastUsed?: string;
}

export function ComponentCard({ component, lastUsed }: ComponentCardProps) {
  const scopedT = useScopedI18n("component_library");

  return (
    <Card className="p-4 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <Text weight="medium">{component.name}</Text>
          <Text size="1" className="text-gray-11">
            {component.description}
          </Text>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <IconButton variant="ghost" size="1">
              <Icons.MoreVertical className="w-4 h-4" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Icons.Edit className="w-4 h-4 mr-2" />
              {scopedT("actions.edit")}
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Icons.Copy className="w-4 h-4 mr-2" />
              {scopedT("actions.duplicate")}
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">
              <Icons.Trash className="w-4 h-4 mr-2" />
              {scopedT("actions.delete")}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="surface" className="capitalize">
          {component.status}
        </Badge>
        {component.usage_count > 0 && (
          <Badge variant="outline">
            {scopedT("usage_count", { count: component.usage_count })}
          </Badge>
        )}
      </div>

      {lastUsed && (
        <Text size="1" className="text-gray-11">
          {scopedT("last_used", { time: lastUsed })}
        </Text>
      )}
    </Card>
  );
}
