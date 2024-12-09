import type { Component } from "@/types";
import { Badge } from "@v1/ui/badge";
import { clsx } from "clsx";
import dateFormat from "dateformat";

type ComponentListItemProps = {
  component: Component;
};

const CELL_CLASSES = "relative text-sm component-grid-item";
const NO_CONTENT = (
  <div className="w-full flex justify-center text-gray-8">-</div>
);

export const ComponentListItem = ({ component }: ComponentListItemProps) => {
  return (
    <>
      <div className={CELL_CLASSES}>
        <Badge
          className="text-mono -mt-[1.5px]"
          size="2"
          color={getStatusColor(component.status)}
        >
          {component.status ?? NO_CONTENT}
        </Badge>
      </div>

      <div className={CELL_CLASSES}>{component.name}</div>

      <div className={clsx("max-w-[50vw]", CELL_CLASSES)}>
        {component.description ?? NO_CONTENT}
      </div>

      <div className={clsx("flex gap-1 flex-wrap h-fit", CELL_CLASSES)}>
        {component?.keywords?.length === 0 && NO_CONTENT}
        {component?.keywords?.map((keyword) => {
          return (
            <Badge key={keyword} size="1" color="gray">
              {keyword}
            </Badge>
          );
        })}
      </div>

      <div className={CELL_CLASSES}>
        {dateFormat(component.updated_at, "mmmm dd, yyyy")}
      </div>
    </>
  );
};

function getStatusColor(status: Component["status"]) {
  switch (status) {
    case "private":
      return "gray";
    case "public":
      return "green";
    case "in_review":
      return "orange";
    default:
      return "gray";
  }
}
