import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { clsx } from "clsx";

interface PropertyToggleProps {
  label: string;
  enabled: boolean;
  onToggle: () => void;
  className?: string;
  actionsSlot?: React.ReactNode;
}

export const PropertyToggle = ({
  label,
  enabled,
  onToggle,
  className,
  actionsSlot,
}: PropertyToggleProps) => {
  return (
    <div className={clsx("flex justify-between items-center", className)}>
      <Text size="2" className="text-gray-11">
        {label}
      </Text>
      <div className="flex items-center gap-2">
        {actionsSlot}
        <IconButton
          variant="ghost"
          color="gray"
          size="2"
          className="text-gray-10"
          onClick={onToggle}
        >
          {enabled ? <Icons.X /> : <Icons.Plus />}
        </IconButton>
      </div>
    </div>
  );
};
