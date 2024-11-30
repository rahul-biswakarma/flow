import { TextField } from "@v1/ui/text-field";
import { useState } from "react";
// import { ComponentCategories } from "./component-categories";
// import { ComponentList } from "./component-list";

export const ComponentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col gap-2 p-2 bg-panel">
      <TextField.Root
        placeholder="Search components..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* <ComponentCategories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ScrollArea className="flex-1">
        <ComponentList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </ScrollArea> */}
    </div>
  );
};
