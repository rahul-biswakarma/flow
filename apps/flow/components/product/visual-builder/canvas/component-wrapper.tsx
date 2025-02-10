import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useBuilderDrop } from "../hooks/drop";
import type {
  ContainerDirection,
  DragItem,
  DropTarget,
  DropZone,
  VisualBuilderComponent,
} from "../types";
import { DropZoneIndicator } from "./drop-zone-indicator";

interface BuilderComponentWrapperProps {
  component: VisualBuilderComponent;
  containerId: string;
  containerDirection: ContainerDirection;
  children: React.ReactNode;
}

const calculateDropZone = (
  rect: DOMRect,
  clientOffset: { x: number; y: number },
  containerDirection: ContainerDirection,
): DropZone | null => {
  const relX = (clientOffset.x - rect.left) / rect.width;
  const relY = (clientOffset.y - rect.top) / rect.height;

  if (containerDirection === "row") {
    if (relX < 0.3) return "left";
    if (relX > 0.7) return "right";
    return null;
  } else {
    if (relY < 0.3) return "top";
    if (relY > 0.7) return "bottom";
    return null;
  }
};

export function BuilderComponentWrapper({
  component,
  containerId,
  containerDirection,
  children,
}: BuilderComponentWrapperProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [activeDropZone, setActiveDropZone] = useState<DropZone | null>(null);
  const { handleDrop } = useBuilderDrop();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: {
      id: component.id,
      type: "existing-component",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "COMPONENT",
      hover: (item, monitor) => {
        if (!componentRef.current) return;

        const rect = componentRef.current.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;

        const zone = calculateDropZone(rect, clientOffset, containerDirection);

        setActiveDropZone(zone);
      },
      drop: (item: DragItem) => {
        if (!activeDropZone) return;

        const dropTarget: DropTarget = {
          containerId,
          targetId: component.id,
          zone: activeDropZone,
        };

        handleDrop(item, dropTarget);
        setActiveDropZone(null);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [activeDropZone, containerId, containerDirection],
  );

  return (
    <div
      ref={(node) => {
        componentRef.current = node;
        drag(drop(node));
      }}
      className={`relative ${isDragging ? "opacity-50" : ""}`}
    >
      {isOver && activeDropZone && <DropZoneIndicator zone={activeDropZone} />}
      {children}
    </div>
  );
}
