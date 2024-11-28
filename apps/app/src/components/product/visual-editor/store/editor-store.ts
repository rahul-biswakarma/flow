import { create } from "zustand";
import type { ComponentDefinition, EditorState } from "../types";

interface EditorStore extends EditorState {
  setSelectedComponent: (id: string | null) => void;
  addComponent: (component: ComponentDefinition) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<ComponentDefinition>) => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  selectedComponentId: null,
  components: {},
  dropZones: [],
  undoStack: [],
  redoStack: [],

  setSelectedComponent: (id) =>
    set((state) => ({ ...state, selectedComponentId: id })),

  addComponent: (component) =>
    set((state) => ({
      ...state,
      components: { ...state.components, [component.id]: component },
    })),

  removeComponent: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.components;
      return { ...state, components: rest };
    }),

  updateComponent: (id, updates) =>
    set((state) => ({
      ...state,
      components: {
        ...state.components,
        [id]: { ...state.components[id], ...updates },
      },
    })),

  undo: () => {
    // Implement undo logic
  },

  redo: () => {
    // Implement redo logic
  },
}));
