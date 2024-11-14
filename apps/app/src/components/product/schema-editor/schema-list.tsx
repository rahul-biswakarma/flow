import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";
import { Dialog } from "@v1/ui/dialog";
import { Icons } from "@v1/ui/icons";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Text } from "@v1/ui/text";
import { useState } from "react";
import type { Schema } from "./types";
import { useSchemas } from "./use-schemas";

interface SchemaListProps {
  selectedSchema: Schema | null;
  onSchemaSelect: (schema: Schema) => void;
}

export const SchemaList = ({
  selectedSchema,
  onSchemaSelect,
}: SchemaListProps) => {
  const { schemas, createSchema, deleteSchema } = useSchemas();
  const [schemaToDelete, setSchemaToDelete] = useState<Schema | null>(null);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-outline-02">
        <div className="flex items-center justify-between mb-2">
          <Text size="2" weight="medium">
            Schemas
          </Text>
          <Button size="1" variant="ghost" onClick={() => createSchema()}>
            <Icons.Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {schemas.map((schema) => (
            <Card
              key={schema.id}
              className={`p-3 cursor-pointer transition-colors ${
                selectedSchema?.id === schema.id
                  ? "bg-accent-3 border-accent-7"
                  : "hover:bg-gray-3"
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex-1"
                  onClick={() => onSchemaSelect(schema)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onSchemaSelect(schema);
                    }
                  }}
                  aria-label={`Select schema: ${schema.name || "Untitled Schema"}`}
                >
                  <div className="flex items-center gap-2">
                    <Text
                      size="2"
                      weight="medium"
                      className={schema.name ? "" : "text-red-9"}
                    >
                      {schema.name || "Untitled Schema"}
                    </Text>
                    {schema.fields.length === 0 && (
                      <Icons.AlertTriangle className="w-3 h-3 text-yellow-9" />
                    )}
                  </div>
                  {schema.description && (
                    <Text size="1" className="text-gray-11 mt-1 line-clamp-2">
                      {schema.description}
                    </Text>
                  )}
                </div>
                <Button
                  size="1"
                  variant="ghost"
                  className="text-red-9 hover:text-red-10 hover:bg-red-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSchemaToDelete(schema);
                  }}
                >
                  <Icons.Trash className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog.Root
        open={!!schemaToDelete}
        onOpenChange={() => setSchemaToDelete(null)}
      >
        <Dialog.Content>
          <Dialog.Title>Delete Schema</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete "
            {schemaToDelete?.name || "Untitled Schema"}"? This action cannot be
            undone.
          </Dialog.Description>
          <div className="flex justify-end gap-2 mt-4">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              variant="solid"
              color="red"
              onClick={() => {
                if (schemaToDelete) {
                  deleteSchema(schemaToDelete.id);
                  if (
                    selectedSchema?.id === schemaToDelete.id &&
                    schemas.length > 0
                  ) {
                    onSchemaSelect(schemas[0]!);
                  }
                }
                setSchemaToDelete(null);
              }}
            >
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};
