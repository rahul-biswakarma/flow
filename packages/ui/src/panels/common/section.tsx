import { Text } from "../../components";

export const Section = ({
  title,
  children,
  actions,
}: {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Text size="2" weight="medium" className="cursor-default">
          {title}
        </Text>
        <div className="flex gap-2 items-center">{actions}</div>
      </div>
      {children}
    </div>
  );
};
