import { Text } from "@v1/ui/text";
import { DraggableComponent } from "./draggable-component";
import { useComponents } from "./hooks/use-components";
import type { ComponentListProps } from "./types";

export const ComponentList = ({
  searchQuery,
  selectedCategory,
}: ComponentListProps) => {
  const { data: components, isLoading, error } = useComponents();

  if (isLoading) {
    return <Text>Loading components...</Text>;
  }

  if (error) {
    return <Text color="red">Error loading components</Text>;
  }

  const filteredComponents = components?.filter((component) => {
    const matchesSearch = component.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!filteredComponents?.length) {
    return <Text>No components found</Text>;
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredComponents.map((component) => (
        <DraggableComponent
          key={component.id}
          id={component.id}
          name={component.name}
          icon={component.thumbnail}
          category={component.category}
        />
      ))}
    </div>
  );
};
