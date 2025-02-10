import { clsx } from "clsx";
import { Text } from "../../components";

export const GroupFieldCardWrapper = ({
  children,
  groupLabel,
  className,
  footer,
  headerAction,
  containerClassName,
}: {
  children: React.ReactNode;
  groupLabel: string;
  footer?: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  containerClassName?: string;
}) => {
  return (
    <div
      className={clsx(
        "rounded-md bg-gray-a2 px-4 py-5 space-y-4 flex flex-col gap-1 border border-gray-5",
        containerClassName,
      )}
    >
      <div className="flex gap-2 justify-between items-center">
        <Text className="text-gray-11" size="2">
          {groupLabel}
        </Text>
        {headerAction}
      </div>
      {children && (
        <div className={clsx("grid grid-cols-[auto_1fr] gap-4", className)}>
          {children}
        </div>
      )}
      {footer}
    </div>
  );
};
