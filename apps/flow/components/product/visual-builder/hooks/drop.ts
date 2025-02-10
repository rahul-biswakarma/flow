import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useVisualBuilderContext } from "../context/visual-builder.context";
import type {
  DragItem,
  DropTarget,
  VisualBuilderComponent,
  VisualBuilderContainer,
} from "../types";

export function useBuilderDrop() {
  const { vbData, setVbData } = useVisualBuilderContext();

  const findAndRemoveComponent = useCallback(
    (
      containers: VisualBuilderContainer[],
      componentId: string,
    ): VisualBuilderComponent | null => {
      for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        const componentIndex = container.children.findIndex(
          (child) => !("children" in child) && child.id === componentId,
        );

        if (componentIndex !== -1) {
          const [removedComponent] = container.children.splice(
            componentIndex,
            1,
          );
          return removedComponent as VisualBuilderComponent;
        }

        const nestedContainers = container.children.filter(
          (child): child is VisualBuilderContainer => "children" in child,
        );

        for (const nestedContainer of nestedContainers) {
          const found = findAndRemoveComponent([nestedContainer], componentId);
          if (found) return found;
        }
      }
      return null;
    },
    [],
  );

  const handleDrop = useCallback(
    (dragItem: DragItem, dropTarget: DropTarget) => {
      setVbData((prevData) => {
        const newData = [...prevData];
        let componentToAdd: VisualBuilderComponent;

        // For existing components, remove them first
        if (dragItem.id && dragItem.type === "existing-component") {
          const existingComponent = findAndRemoveComponent(
            newData,
            dragItem.id,
          );
          if (!existingComponent) {
            return prevData;
          }
          componentToAdd = existingComponent;
        } else {
          // Create new component
          componentToAdd = {
            id: nanoid(),
            code: dragItem.componentCode || "",
            styles: {},
            props: [],
          };
        }

        const updateContainer = (
          containers: VisualBuilderContainer[],
        ): boolean => {
          for (const container of containers) {
            if (container.id === dropTarget.containerId) {
              // Simple append if no target specified
              if (!dropTarget.targetId) {
                container.children.push(componentToAdd);
                return true;
              }

              const targetIndex = container.children.findIndex(
                (child) =>
                  !("children" in child) && child.id === dropTarget.targetId,
              );

              if (targetIndex === -1) {
                container.children.push(componentToAdd);
                return true;
              }

              if (dropTarget.zone) {
                // Handle horizontal drops in row container
                if (
                  (dropTarget.zone === "left" || dropTarget.zone === "right") &&
                  container.layout.direction === "row"
                ) {
                  const insertIndex =
                    dropTarget.zone === "left" ? targetIndex : targetIndex + 1;
                  container.children.splice(insertIndex, 0, componentToAdd);
                  return true;
                }

                // Handle vertical drops in column container
                if (
                  (dropTarget.zone === "top" || dropTarget.zone === "bottom") &&
                  container.layout.direction === "column"
                ) {
                  const insertIndex =
                    dropTarget.zone === "top" ? targetIndex : targetIndex + 1;
                  container.children.splice(insertIndex, 0, componentToAdd);
                  return true;
                }

                // Create new container if dropping perpendicular to current direction
                const newContainer: VisualBuilderContainer = {
                  id: nanoid(),
                  children: [
                    dropTarget.zone === "top" || dropTarget.zone === "left"
                      ? componentToAdd
                      : container.children[targetIndex],
                    dropTarget.zone === "top" || dropTarget.zone === "left"
                      ? container.children[targetIndex]
                      : componentToAdd,
                  ],
                  styles: {},
                  layout: {
                    direction:
                      container.layout.direction === "row" ? "column" : "row",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "1rem",
                  },
                };
                container.children[targetIndex] = newContainer;
                return true;
              }
            }

            // Check nested containers
            const nestedContainers = container.children.filter(
              (child): child is VisualBuilderContainer => "children" in child,
            );
            if (nestedContainers.some((c) => updateContainer([c]))) {
              return true;
            }
          }
          return false;
        };

        if (!updateContainer(newData)) {
          // Create new root container if needed
          newData.push({
            id: nanoid(),
            children: [componentToAdd],
            styles: {},
            layout: {
              direction: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "1rem",
            },
          });
        }

        return newData;
      });
    },
    [findAndRemoveComponent, setVbData],
  );

  return { handleDrop };
}
