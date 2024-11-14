import { Button } from "@v1/ui/button";
import { Dialog } from "@v1/ui/dialog";
import { Icons } from "@v1/ui/icons";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Switch } from "@v1/ui/switch";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { nanoid } from "nanoid";
import { useState } from "react";
import { AISchemaGenerator } from "./ai-schema-generator";
import { FieldBuilder } from "./field-builder";
import type { Schema, SchemaField } from "./types";

interface SchemaBuilderProps {
  selectedSchema: Schema | null;
  onSchemaUpdate: (schema: Schema) => void;
}

export const SchemaBuilder = ({
  selectedSchema,
  onSchemaUpdate,
}: SchemaBuilderProps) => {
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    fields?: string;
  }>({});

  if (!selectedSchema) {
    return (
      <div className="h-full flex items-center justify-center">
        <Text size="2" className="text-gray-11">
          Select a schema to edit
        </Text>
      </div>
    );
  }

  const validateSchema = () => {
    const errors: typeof validationErrors = {};

    if (!selectedSchema.name.trim()) {
      errors.name = "Schema name is required";
    }

    if (selectedSchema.fields.length === 0) {
      errors.fields = "Add at least one field to your schema";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addField = () => {
    const newField: SchemaField = {
      id: nanoid(),
      name: "",
      type: "text",
      required: false,
      unique: false,
    };

    onSchemaUpdate({
      ...selectedSchema,
      fields: [...selectedSchema.fields, newField],
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-outline-02 flex items-center justify-between">
        <Text size="2" weight="medium">
          Schema Editor
        </Text>
        <Button
          size="1"
          variant="soft"
          onClick={() => setShowAIGenerator(true)}
        >
          <Icons.Bot className="w-4 h-4 mr-1" />
          AI Assistant
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Text size="2">Name</Text>
            <TextField.Root
              value={selectedSchema.name}
              onChange={(e) => {
                onSchemaUpdate({ ...selectedSchema, name: e.target.value });
                if (validationErrors.name) {
                  setValidationErrors({ ...validationErrors, name: undefined });
                }
              }}
              placeholder="Schema name"
              color={validationErrors.name ? "red" : undefined}
            />
            {validationErrors.name && (
              <Text size="1" color="red" className="mt-1">
                {validationErrors.name}
              </Text>
            )}
          </div>

          <div className="space-y-2">
            <Text size="2">Description</Text>
            <TextField.Root
              value={selectedSchema.description || ""}
              onChange={(e) =>
                onSchemaUpdate({
                  ...selectedSchema,
                  description: e.target.value,
                })
              }
              placeholder="Schema description"
            />
          </div>

          <div className="space-y-2">
            <Text size="2">Options</Text>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={selectedSchema.timestamps}
                  onCheckedChange={(checked) =>
                    onSchemaUpdate({
                      ...selectedSchema,
                      timestamps: checked,
                    })
                  }
                />
                <Text size="2">Enable Timestamps</Text>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={selectedSchema.softDelete}
                  onCheckedChange={(checked) =>
                    onSchemaUpdate({
                      ...selectedSchema,
                      softDelete: checked,
                    })
                  }
                />
                <Text size="2">Enable Soft Delete</Text>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text size="2">Fields</Text>
              <Button size="1" variant="ghost" onClick={addField}>
                <Icons.Plus className="w-4 h-4" />
                Add Field
              </Button>
            </div>
            {validationErrors.fields && (
              <Text size="1" color="red">
                {validationErrors.fields}
              </Text>
            )}
            <div className="space-y-2">
              {selectedSchema.fields.map((field, index) => (
                <FieldBuilder
                  key={field.id}
                  field={field}
                  schemas={[selectedSchema]}
                  onChange={(updatedField) => {
                    const newFields = [...selectedSchema.fields];
                    newFields[index] = updatedField;
                    onSchemaUpdate({
                      ...selectedSchema,
                      fields: newFields,
                    });
                    if (validationErrors.fields) {
                      setValidationErrors({
                        ...validationErrors,
                        fields: undefined,
                      });
                    }
                  }}
                  onDelete={() => {
                    onSchemaUpdate({
                      ...selectedSchema,
                      fields: selectedSchema.fields.filter(
                        (f) => f.id !== field.id,
                      ),
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <Dialog.Root open={showAIGenerator} onOpenChange={setShowAIGenerator}>
        <Dialog.Content className="max-w-2xl">
          <Dialog.Title>AI Schema Generator</Dialog.Title>
          <AISchemaGenerator
            onGenerate={(schema) => {
              onSchemaUpdate({
                ...selectedSchema,
                ...schema,
              });
              setShowAIGenerator(false);
            }}
          />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};
