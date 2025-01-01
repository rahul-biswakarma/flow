import { ComponentPreview } from "@flow/components/preview";
import clsx from "clsx";
import {} from "react";
// components/builder-container.tsx
import { useState } from "react";
import { useDrop } from "react-dnd";
import { useVisualBuilderContext } from "../context/visual-builder.context";
import { useBuilderDrop } from "../hooks/drop";
import type { DragItem, DropTarget, VisualBuilderContainer } from "../types";
import { BuilderComponentWrapper } from "./component";

export function BuilderContainer({
  container,
}: { container: VisualBuilderContainer }) {
  const { setVbData } = useVisualBuilderContext();
  const { handleDrop } = useBuilderDrop();
  const [showControls, setShowControls] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: DragItem) => {
      const dropTarget: DropTarget = {
        containerId: container.id,
      };
      handleDrop(item, dropTarget);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  const toggleDirection = () => {
    setVbData((prevData) => {
      const newData = [...prevData];
      const updateContainer = (
        containers: VisualBuilderContainer[],
      ): boolean => {
        for (const c of containers) {
          if (c.id === container.id) {
            c.layout.direction =
              c.layout.direction === "row" ? "column" : "row";
            return true;
          }
          if (c.children) {
            const found = updateContainer(
              c.children.filter(
                (child): child is VisualBuilderContainer => "children" in child,
              ),
            );
            if (found) return true;
          }
        }
        return false;
      };
      updateContainer(newData);
      return newData;
    });
  };

  return (
    <div
      ref={drop}
      className={clsx(
        "relative min-h-[50px] p-2 transition-colors",
        isOver && "bg-blue-50/50",
        !container.children?.length && "border-2 border-dashed border-gray-300"
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      style={{
        display: "flex",
        flexDirection: container.layout.direction,
        gap: container.layout.gap,
        justifyContent: container.layout.justifyContent,
        alignItems: container.layout.alignItems,
        ...container.styles,
      }}
    >
      {showControls && (
        <div className="absolute right-2 top-2 z-50 rounded-md bg-white/90 shadow-sm">
          <button
            onClick={toggleDirection}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            {container.layout.direction === "row" ? "⇋" : "⇅"}
          </button>
        </div>
      )}
      {(container.children || []).map((child) =>
        "children" in child ? (
          <BuilderContainer key={child.id} container={child} />
        ) : (
          <BuilderComponentWrapper
            key={child.id}
            component={child}
            containerId={container.id}
            containerDirection={container.layout.direction}
          >
            <ComponentPreview
              componentCode={child.code}
              styleValue={child.styles}
              componentProps={child.props}
            />
          </BuilderComponentWrapper>
        ),
      )}
    </div>
  );
}
