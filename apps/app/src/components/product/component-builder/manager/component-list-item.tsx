import type { Component } from "@/types";
import { Badge } from "@v1/ui/badge";
import { clsx } from "clsx";
import dateFormat from "dateformat";

type ComponentListItemProps = {
  component: Component;
};

const CELL_CLASSES = "relative text-sm component-grid-item";

export const ComponentListItem = ({ component }: ComponentListItemProps) => {
  return (
    <>
      <div className={CELL_CLASSES}>
        <Badge
          className="text-mono"
          size="2"
          color={getStatusColor(component.status)}
        >
          {component.status}
        </Badge>
      </div>

      <div className={CELL_CLASSES}>{component.name}</div>

      <div className={clsx("max-w-[50vw]", CELL_CLASSES)}>
        {component.description}
      </div>

      <div className={clsx("flex gap-1 flex-wrap h-fit", CELL_CLASSES)}>
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
