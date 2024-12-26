import { clsx } from "clsx";
import { IconButton, Text } from "../../components";
import { Icons } from "../../icons";

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
