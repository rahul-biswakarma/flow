import { Text } from "@v1/ui/text";
import { clsx } from "clsx";

export const GroupFieldWrapper = ({
  children,
  groupLabel,
  className,
  footer,
}: {
  children: React.ReactNode;
  groupLabel: string;
  footer?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="rounded-md bg-gray-a2 px-4 py-5 space-y-4 flex flex-col gap-1">
      <Text className="text-gray-11" size="3">
        {groupLabel}
      </Text>
      <div className={clsx("grid grid-cols-[auto_1fr] gap-4", className)}>
        {children}
      </div>
      {footer}
    </div>
  );
};
