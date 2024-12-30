import clsx from "clsx";
import { Text } from "../../components";

export const Section = ({
  title,
  children,
  actions,
  actionPosition = "start",
}: {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  actionPosition?: "start" | "end";
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={clsx("flex items-center gap-3", {
          "justify-between": actionPosition === "end",
          "justify-start": actionPosition === "start",
        })}
      >
        <Text size="2" weight="medium" className="cursor-default">
          {title}
        </Text>
        <div className="flex gap-2 items-center">{actions}</div>
      </div>
      {children}
    </div>
  );
};
