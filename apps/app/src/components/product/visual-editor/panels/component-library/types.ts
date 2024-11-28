export interface ComponentCategory {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface ComponentListProps {
  searchQuery: string;
  selectedCategory: string | null;
}

export interface ComponentCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export interface DraggableComponentProps {
  id: string;
  name: string;
  icon?: string;
  category: string;
}
