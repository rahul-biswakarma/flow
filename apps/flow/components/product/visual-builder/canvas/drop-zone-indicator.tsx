import clsx from "clsx";
import type { DropZone } from "../types";

export const ContainerDropZoneIndicator = ({
  direction,
  zone,
}: {
  direction: "row" | "column";
  zone: DropZone;
}) => {
  const isHorizontal = direction === "row";

  return (
    <div
      className={clsx(
        "absolute pointer-events-none z-10 bg-blue-500/20 border-2 border-blue-500",
        {
          "h-full w-[40%]": isHorizontal,
          "w-full h-[40%]": !isHorizontal,
          "left-0": zone === "left",
          "right-0": zone === "right",
          "top-0": zone === "top",
          "bottom-0": zone === "bottom",
        },
      )}
    />
  );
};

export const ComponentDropZoneIndicator = ({ zone }: { zone: DropZone }) => {
  return (
    <div
      className={clsx("absolute pointer-events-none z-10", {
        // Left indicator
        "left-0 top-0 bottom-0 w-1 bg-blue-500": zone === "left",
        // Right indicator
        "right-0 top-0 bottom-0 w-1 bg-blue-500": zone === "right",
        // Top indicator
        "top-0 left-0 right-0 h-1 bg-blue-500": zone === "top",
        // Bottom indicator
        "bottom-0 left-0 right-0 h-1 bg-blue-500": zone === "bottom",
        // Center indicator
        "inset-0 border-2 border-blue-500": zone === "center",
      })}
    >
      {/* Add drop position indicator arrow */}
      <div
        className={clsx("absolute w-2 h-2 bg-blue-500 transform rotate-45", {
          "-left-1 top-1/2 -translate-y-1/2": zone === "left",
          "-right-1 top-1/2 -translate-y-1/2": zone === "right",
          "top-[-4px] left-1/2 -translate-x-1/2": zone === "top",
          "bottom-[-4px] left-1/2 -translate-x-1/2": zone === "bottom",
        })}
      />
    </div>
  );
};

interface DropZoneIndicatorProps {
  zone: DropZone;
}

export function DropZoneIndicator({ zone }: DropZoneIndicatorProps) {
  return (
    <div
      className={clsx("absolute pointer-events-none z-10", {
        "left-0 top-0 bottom-0 w-1 bg-blue-500": zone === "left",
        "right-0 top-0 bottom-0 w-1 bg-blue-500": zone === "right",
        "top-0 left-0 right-0 h-1 bg-blue-500": zone === "top",
        "bottom-0 left-0 right-0 h-1 bg-blue-500": zone === "bottom",
      })}
    />
  );
}
