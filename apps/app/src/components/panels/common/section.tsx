import { Text } from "@v1/ui/text";

export const Section = ({
  title,
  children,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <Text size="2" weight="medium">
          {title}
        </Text>
        <div className="flex gap-2 items-center">{actions}</div>
      </div>
      {children}
    </div>
  );
};
