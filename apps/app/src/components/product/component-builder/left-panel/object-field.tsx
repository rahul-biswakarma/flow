import { TextFieldElement } from "@/components/field-elements";
import { fieldFontSize } from "@/components/field-elements/constants";
import { DropdownFieldElement } from "@/components/field-elements/dropdown-field";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import type React from "react";
import { useState } from "react";
import type { ObjectSchema, ObjectSchemaProperty, PropsType } from "../types";

const MAX_KEYS = 8;
const MAX_OBJECT_NESTING = 2;
const ICON_CLASSES = "!text-gray-10";
const NESTED_MARGIN = 15; // pixels to indent nested objects

interface ObjectTypeFieldsProps {
  objectSchema: ObjectSchema;
  onChange: (newSchema: ObjectSchema) => void;
  nestingLevel: number;
  fieldName?: string;
}

export const ObjectTypeFields: React.FC<ObjectTypeFieldsProps> = ({
  objectSchema,
  onChange,
  nestingLevel,
  fieldName = "Object",
}) => {
  const [keys, setKeys] = useState<string[]>(Object.keys(objectSchema));

  const addKey = () => {
    const newKey = `New Key ${nestingLevel}${keys.length}`;
    setKeys([...keys, newKey]);
    onChange({ ...objectSchema, [newKey]: { type: "string", name: newKey } });
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
    <div
      style={{
        paddingLeft: `${nestingLevel * NESTED_MARGIN}px`,
      }}
      className="flex flex-col w-full gap-2 p-2"
    >
      <Text className={fieldFontSize} weight="medium">
        {fieldName} Properties
      </Text>

      <div className="flex flex-col gap-2 pl-2 border-l-2 border-gray-a3">
        {keys.map((key, index: number) => {
          const property = objectSchema[key];
          if (!property) return null;

          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={`object_field_${nestingLevel}_${index}`}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <TextFieldElement
                  value={key}
                  onChange={(e: FieldOnChangeProps<string>) =>
                    updateKey(key, e.value)
                  }
                  placeholder="Key name"
                />
                <DropdownFieldElement
                  triggerSize="2"
                  dropdownKey={`object_field_${nestingLevel}_${index}`}
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
                  className="py-2 ml-1"
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
                    fieldName={key}
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
      </div>
      <div className="flex gap-2 items-center">
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
