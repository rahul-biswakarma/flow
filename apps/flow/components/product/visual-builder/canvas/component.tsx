import { ComponentPreview } from "@flow/components/preview";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useVisualBuilderContext } from "../context/visual-builder.context";
import { useBuilderDrop } from "../hooks/drop";
import type {
  ContainerDirection,
  DragItem,
  DropTarget,
  DropZone,
  VisualBuilderComponent,
  VisualBuilderContainer,
} from "../types";
import {
  ComponentDropZoneIndicator,
  DropZoneIndicator,
} from "./drop-zone-indicator";

interface BuilderComponentWrapperProps {
  component: VisualBuilderComponent;
  containerId: string;
  containerDirection: ContainerDirection;
  children: React.ReactNode;
}

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

        const { x, y } = clientOffset;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let zone: DropZone | null = null;

        if (containerDirection === "row") {
          if (x < centerX) zone = "left";
          else zone = "right";
        } else {
          if (y < centerY) zone = "top";
          else zone = "bottom";
        }

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

export const BuilderComponent = ({
  component,
  containerId,
  onDropTargetChange,
}: {
  component: VisualBuilderComponent;
  containerId: string;
  onDropTargetChange: (target: DropTarget | null) => void;
}) => {
  const { setSelectedComponent, vbData, setVbData } = useVisualBuilderContext();
  const componentRef = useRef<HTMLDivElement>(null);
  const [currentDropZone, setCurrentDropZone] = useState<DropZone | null>(null);

  const determineDropZone = (e: MouseEvent): DropZone => {
    if (!componentRef.current) return "center";
    const rect = componentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const horizontalZone =
      x < rect.width * 0.3 ? "left" : x > rect.width * 0.7 ? "right" : "center";
    const verticalZone =
      y < rect.height * 0.3
        ? "top"
        : y > rect.height * 0.7
          ? "bottom"
          : "center";

    // If we're closer to the top/bottom edges than left/right
    const isVertical =
      Math.min(y, rect.height - y) < Math.min(x, rect.width - x);

    return isVertical ? verticalZone : horizontalZone;
  };

  const handleDrop = (item: any, dropZone: DropZone) => {
    const newComponent: VisualBuilderComponent = {
      id: nanoid(),
      code: item.componentCode,
      styles: {},
      props: [],
    };

    setVbData((prevData) => {
      const newData = [...prevData];
      const updateContainer = (
        containers: VisualBuilderContainer[],
      ): boolean => {
        for (let i = 0; i < containers.length; i++) {
          const container = containers[i];
          if (container.id === containerId) {
            const componentIndex = container.children.findIndex(
              (child) => child.id === component.id,
            );
            if (componentIndex === -1) return false;

            // Handle horizontal drops in row container
            if (
              (dropZone === "left" || dropZone === "right") &&
              container.layout.direction === "row"
            ) {
              const newIndex =
                dropZone === "left" ? componentIndex : componentIndex + 1;
              container.children.splice(newIndex, 0, newComponent);
            }
            // Handle vertical drops - create new column container
            else if (dropZone === "top" || dropZone === "bottom") {
              const newContainer: VisualBuilderContainer = {
                id: nanoid(),
                children:
                  dropZone === "top"
                    ? [newComponent, container.children[componentIndex]]
                    : [container.children[componentIndex], newComponent],
                styles: {},
                layout: {
                  direction: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  gap: "1rem",
                },
              };
              // Replace the existing component with the new container
              container.children.splice(componentIndex, 1, newContainer);
            }
            return true;
          }
          if (container.children) {
            const found = updateContainer(
              container.children.filter(
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

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "COMPONENT",
      hover: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset || !componentRef.current) return;

        const dropZone = determineDropZone(
          clientOffset as unknown as MouseEvent,
        );
        setCurrentDropZone(dropZone);

        onDropTargetChange({
          type: "component",
          id: component.id,
          zone: dropZone,
        });
      },
      drop: (item: any, monitor) => {
        if (monitor.didDrop()) return;
        handleDrop(item, currentDropZone || "center");
        setCurrentDropZone(null);
        onDropTargetChange(null);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    }),
    [currentDropZone],
  );

  return (
    <div
      ref={(node) => {
        componentRef.current = node;
        drop(node);
      }}
      data-component-id={component.id}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedComponent(component);
      }}
      className="relative group"
    >
      {isOver && currentDropZone && (
        <ComponentDropZoneIndicator zone={currentDropZone} />
      )}
      <div className="relative">
        <div className="absolute inset-0 hidden group-hover:block bg-blue-100/20 border-2 border-blue-500 pointer-events-none" />
        <ComponentPreview
          componentCode={component.code}
          styleValue={component.styles}
          componentProps={component.props}
        />
      </div>
    </div>
  );
};
