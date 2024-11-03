import { TextFieldElement } from "@/components/field-elements";
import { DropdownFieldElement } from "@/components/field-elements/dropdown-field";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Separator } from "@v1/ui/separator";
import { Text } from "@v1/ui/text";
import type React from "react";
import { useState } from "react";
import type { ObjectSchema, ObjectSchemaProperty, PropsType } from "./types";

const MAX_KEYS = 8;
const MAX_OBJECT_NESTING = 2;
const ICON_CLASSES = "!w-4 !h-4 text-gray-10";

interface ObjectTypeFieldsProps {
  objectSchema: ObjectSchema;
  onChange: (newSchema: ObjectSchema) => void;
  nestingLevel: number;
}

export const ObjectTypeFields: React.FC<ObjectTypeFieldsProps> = ({
  objectSchema,
  onChange,
  nestingLevel,
}) => {
  const [keys, setKeys] = useState<string[]>(Object.keys(objectSchema));

  const addKey = () => {
    const newKey = `newKey${keys.length}`;
    setKeys([...keys, newKey]);
    onChange({ ...objectSchema, [newKey]: { type: "string" } });
  };

  const removeKey = (keyToRemove: string) => {
    const newSchema = { ...objectSchema };
    delete newSchema[keyToRemove];
    setKeys(keys.filter((key) => key !== keyToRemove));
    onChange(newSchema);
  };

  const updateKey = (oldKey: string, newKey: string) => {
    if (oldKey !== newKey) {
      const newSchema: ObjectSchema = {};
      for (const [key, value] of Object.entries(objectSchema)) {
        if (key === oldKey) {
          newSchema[newKey] = value;
        } else {
          newSchema[key] = value;
        }
      }
      setKeys(keys.map((key) => (key === oldKey ? newKey : key)));
      onChange(newSchema);
    }
  };

  const updateType = (key: string, newType: PropsType) => {
    onChange({
      ...objectSchema,
      [key]: { ...objectSchema[key], type: newType },
    });
  };

  return (
    <div className="flex flex-col w-full gap-2 border-l-2 border-gray-a3 p-2">
      <Text size="2" weight="medium" className="mb-2">
        Object Properties
      </Text>

      {keys.map((key) => {
        const property = objectSchema[key];
        if (!property) return null;

        return (
          <div key={key} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TextFieldElement
                value={key}
                onChange={(e: FieldOnChangeProps<string>) =>
                  updateKey(key, e.value)
                }
                placeholder="Key name"
              />
              <DropdownFieldElement
                options={[
                  { label: "String", value: "string" },
                  { label: "Number", value: "number" },
                  { label: "Boolean", value: "boolean" },
                  ...(nestingLevel < MAX_OBJECT_NESTING
                    ? [{ label: "Object", value: "object" }]
                    : []),
                ]}
                value={property.type}
                onChange={(e) => updateType(key, e.value.value as PropsType)}
              />

              <Button
                variant="ghost"
                size="1"
                color="gray"
                onClick={() => removeKey(key)}
              >
                <Icons.Trash className={ICON_CLASSES} />
              </Button>
            </div>
            {property.type === "object" &&
              nestingLevel < MAX_OBJECT_NESTING && (
                <ObjectTypeFields
                  objectSchema={property.properties || {}}
                  onChange={(newSchema) => {
                    const updatedProperty: ObjectSchemaProperty = {
                      ...property,
                      properties: newSchema,
                    };
                    onChange({
                      ...objectSchema,
                      [key]: updatedProperty,
                    });
                  }}
                  nestingLevel={nestingLevel + 1}
                />
              )}
          </div>
        );
      })}

      <div className="flex gap-2 items-center">
        <Separator className="w-[50px]" />
        <Button
          size="1"
          color="gray"
          variant="soft"
          onClick={addKey}
          disabled={keys.length >= MAX_KEYS} // Limit keys per object
        >
          <Icons.Plus className={ICON_CLASSES} />
          Add Property
        </Button>
      </div>
    </div>
  );
};
