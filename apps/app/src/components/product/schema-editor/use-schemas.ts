import { nanoid } from "nanoid";
import { useState } from "react";
import type { Schema } from "./types";

export const useSchemas = () => {
  const [schemas, setSchemas] = useState<Schema[]>([]);

  const createSchema = () => {
    const newSchema: Schema = {
      id: nanoid(),
      name: "Untitled Schema",
      fields: [],
      timestamps: true,
      softDelete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSchemas([...schemas, newSchema]);
    return newSchema;
  };

  const updateSchema = (updatedSchema: Schema) => {
    setSchemas(
      schemas.map((s) => (s.id === updatedSchema.id ? updatedSchema : s)),
    );
  };

  const deleteSchema = (schemaId: string) => {
    setSchemas(schemas.filter((s) => s.id !== schemaId));
  };

  return {
    schemas,
    createSchema,
    updateSchema,
    deleteSchema,
  };
};
