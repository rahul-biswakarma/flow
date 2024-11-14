import { useEffect } from "react";
import type { Schema } from "../types";

const STORAGE_KEY = "saved_schemas";

export const useSchemasPersistence = (
  schemas: Schema[],
  setSchemas: (schemas: Schema[]) => void,
) => {
  // Load schemas from localStorage on mount
  useEffect(() => {
    const savedSchemas = localStorage.getItem(STORAGE_KEY);
    if (savedSchemas) {
      try {
        const parsed = JSON.parse(savedSchemas);
        setSchemas(parsed);
      } catch (error) {
        console.error("Error loading saved schemas:", error);
      }
    }
  }, [setSchemas]);

  // Save schemas to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schemas));
    } catch (error) {
      console.error("Error saving schemas:", error);
    }
  }, [schemas]);
};
