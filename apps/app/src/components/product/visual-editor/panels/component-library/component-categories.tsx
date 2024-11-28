import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Text } from "@v1/ui/text";
import type { ComponentCategoriesProps } from "./types";

const CATEGORIES = [
  { id: "layout", name: "Layout" },
  { id: "form", name: "Form" },
  { id: "media", name: "Media" },
  { id: "custom", name: "Custom" },
];

export const ComponentCategories = ({
  selectedCategory,
  onSelectCategory,
}: ComponentCategoriesProps) => {
  return (
    <ScrollArea className="w-full" orientation="horizontal">
      <div className="flex gap-2 p-1">
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant="soft"
            size="1"
            className={cn(
              "whitespace-nowrap",
              selectedCategory === category.id && "bg-accent-3",
            )}
            onClick={() =>
              onSelectCategory(
                selectedCategory === category.id ? null : category.id,
              )
            }
          >
            <Text size="1">{category.name}</Text>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
