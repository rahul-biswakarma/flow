import { Text } from "@v1/ui/text";

export const GroupFieldWrapper = ({
  children,
  groupLabel,
}: {
  children: React.ReactNode;
  groupLabel: string;
}) => {
  return (
    <div className="rounded-md bg-gray-a2 px-4 py-5 space-y-4">
      <Text className="text-gray-11" size="3">
        {groupLabel}
      </Text>
      <div className="grid grid-cols-[auto_1fr] gap-5">{children}</div>
    </div>
  );
};
