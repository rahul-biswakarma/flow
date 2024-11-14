import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";
import { DropdownMenu } from "@v1/ui/dropdown";
import { Icons } from "@v1/ui/icons";
import { Switch } from "@v1/ui/switch";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { useState } from "react";
import type { FieldType, Schema, SchemaField } from "./types";

interface FieldBuilderProps {
  field: SchemaField;
  schemas: Schema[];
  onChange: (field: SchemaField) => void;
  onDelete: () => void;
}

const FIELD_TYPES: {
  label: string;
  value: FieldType;
  icon: React.ReactNode;
}[] = [
  { label: "Text", value: "text", icon: <Icons.FileTypography /> },
  { label: "Number", value: "number", icon: <Icons.Hash /> },
  { label: "Boolean", value: "boolean", icon: <Icons.ToggleLeft /> },
  { label: "Date", value: "date", icon: <Icons.Calendar /> },
  { label: "Reference", value: "reference", icon: <Icons.Link /> },
  { label: "Array", value: "array", icon: <Icons.List /> },
  { label: "Object", value: "object", icon: <Icons.Box /> },
  { label: "Rich Text", value: "rich-text", icon: <Icons.FileTypography /> },
  { label: "Image", value: "image", icon: <Icons.Photo /> },
  { label: "File", value: "file", icon: <Icons.File /> },
];

export const FieldBuilder = ({
  field,
  schemas,
  onChange,
  onDelete,
}: FieldBuilderProps) => {
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
  }>({});

  const validateField = (name: string) => {
    const errors: typeof validationErrors = {};

    if (!name.trim()) {
      errors.name = "Field name is required";
    } else if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
      errors.name =
        "Field name must start with a letter and contain only letters and numbers";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" size="1">
                {FIELD_TYPES.find((t) => t.value === field.type)?.icon}
                <Text size="2">{field.type}</Text>
                <Icons.ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {FIELD_TYPES.map((type) => (
                <DropdownMenu.Item
                  key={type.value}
                  onClick={() => onChange({ ...field, type: type.value })}
                >
                  {type.icon}
                  {type.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <Button size="1" variant="ghost" onClick={onDelete}>
          <Icons.Trash className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <TextField.Root
          value={field.name}
          onChange={(e) => {
            const newName = e.target.value;
            if (validateField(newName)) {
              onChange({ ...field, name: newName });
            }
          }}
          placeholder="Field name"
          color={validationErrors.name ? "red" : undefined}
        />
        {validationErrors.name && (
          <Text size="1" color="red">
            {validationErrors.name}
          </Text>
        )}
        <TextField.Root
          value={field.description || ""}
          onChange={(e) => onChange({ ...field, description: e.target.value })}
          placeholder="Field description"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={field.required}
            onCheckedChange={(checked) =>
              onChange({ ...field, required: checked })
            }
          />
          <Text size="2">Required</Text>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={field.unique}
            onCheckedChange={(checked) =>
              onChange({ ...field, unique: checked })
            }
          />
          <Text size="2">Unique</Text>
        </div>
      </div>

      {field.type === "reference" && (
        <div className="space-y-2">
          <Text size="2">Reference Schema</Text>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="outline" size="1">
                {field.reference?.schema || "Select Schema"}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {schemas.map((schema) => (
                <DropdownMenu.Item
                  key={schema.id}
                  onClick={() =>
                    onChange({
                      ...field,
                      reference: { schema: schema.id, field: "id" },
                    })
                  }
                >
                  {schema.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      )}
    </Card>
  );
};
