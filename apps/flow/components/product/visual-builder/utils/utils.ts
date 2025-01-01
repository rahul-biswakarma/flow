import type { VisualBuilderComponent, VisualBuilderContainer } from "../types";

export function findAndRemoveComponent(
  containers: VisualBuilderContainer[],
  componentId: string,
): VisualBuilderComponent | null {
  for (const container of containers) {
    const index = container.children.findIndex(
      (child) => "id" in child && child.id === componentId,
    );

    if (index !== -1) {
      const [component] = container.children.splice(index, 1);
      return component as VisualBuilderComponent;
    }

    const found = container.children
      .filter((child): child is VisualBuilderContainer => "children" in child)
      .map((child) => findAndRemoveComponent([child], componentId))
      .find(Boolean);

    if (found) return found;
  }
  return null;
}
