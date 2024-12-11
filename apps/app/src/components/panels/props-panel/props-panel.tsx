import {
  BooleanFieldElement,
  DynamicFieldRenderer,
  TextFieldElement,
} from "@/components/field-elements";
import {
  DropdownFieldElement,
  type Option,
} from "@/components/field-elements/dropdown-field";
import type { FieldOnChangeProps } from "@/components/field-elements/types";
import type {
  BasePropValue,
  PropSchema,
  PropValues,
  PropsType,
} from "@/components/product/component-builder/types";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { Section } from "../common/section";

export const PropsPanel = ({
  props,
  propValues,
  setPropValues,
}: {
  props: PropSchema[];
  propValues: PropValues;
  setPropValues: React.Dispatch<React.SetStateAction<PropValues>>;
}) => {
  return (
    <div className="flex gap-2 -mt-2 flex-col">
      {props.map((prop) => (
        <Section key={prop.id}>
          {prop.isList ? (
            <DynamicFieldRenderer
              label={prop.visualName}
              fieldInfo={prop.description}
            >
              <ListPropField
                prop={prop}
                values={(propValues[prop.propName] as BasePropValue[]) || []}
                onChange={(value) =>
                  setPropValues((prev) => ({
                    ...prev,
                    [prop.propName]: value,
                  }))
                }
              />
            </DynamicFieldRenderer>
          ) : (
            <PropField
              prop={prop}
              value={propValues[prop.propName] as BasePropValue}
              onChange={(value) =>
                setPropValues((prev) => ({
                  ...prev,
                  [prop.propName]: value,
                }))
              }
            />
          )}
        </Section>
      ))}
    </div>
  );
};

const PropField = ({
  prop,
  value,
  onChange,
  showTitle = true,
}: {
  prop: PropSchema;
  value: BasePropValue;
  showTitle?: boolean;
  onChange: (value: BasePropValue) => void;
}) => {
  const visualName = showTitle
    ? prop.visualName || prop.propName || "no_name"
    : undefined;
  switch (prop.propType) {
    case "text":
    case "string":
      return (
        <TextFieldElement
          label={visualName}
          fieldInfo={prop.description}
          value={(value as string) || ""}
          onChange={(e: FieldOnChangeProps<string>) => onChange(e.value)}
          required={prop.required}
        />
      );

    case "number":
      return (
        <TextFieldElement
          type="number"
          label={visualName}
          fieldInfo={prop.description}
          value={value?.toString() ?? ""}
          onChange={(e: FieldOnChangeProps<string>) =>
            onChange(Number(e.value))
          }
          required={prop.required}
        />
      );

    case "boolean":
      return (
        <BooleanFieldElement
          label={visualName}
          fieldInfo={prop.description}
          value={(value as boolean) ?? false}
          onChange={(e: FieldOnChangeProps<boolean>) => onChange(e.value)}
        />
      );

    case "dropdown":
      return (
        <DropdownFieldElement
          label={visualName}
          fieldInfo={prop.description}
          value={(value as string) || undefined}
          options={(prop.options as unknown as Option[]) ?? []}
          onChange={(e: FieldOnChangeProps<Option>) => onChange(e.value.value)}
        />
      );

    case "object":
      if (prop.objectSchema) {
        return (
          <div className="flex flex-col gap-2">
            <Text size="2" className="text-gray-11 flex gap-2 items-center">
              {visualName}{" "}
              {prop.description && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icons.InfoCircle className="!w-[16px] !h-[16px] !text-gray-8" />
                  </TooltipTrigger>
                  <TooltipContent>{prop.description}</TooltipContent>
                </Tooltip>
              )}
            </Text>
            <div className="grid grid-cols-[auto_1fr] gap-4 p-4 bg-gray-2 rounded-sm border border-gray-a4">
              {Object.entries(prop.objectSchema).map(([key, schema]) => (
                <PropField
                  key={key}
                  prop={{
                    id: `${prop.id}_${key}`,
                    propName: key,
                    visualName: schema.name,
                    propType: schema.type,
                    objectSchema: schema.properties,
                  }}
                  value={
                    (value as Record<string, BasePropValue>)?.[key] ?? null
                  }
                  onChange={(newValue) =>
                    onChange({
                      ...(value as Record<string, BasePropValue>),
                      [key]: newValue,
                    })
                  }
                />
              ))}
            </div>
          </div>
        );
      }
      return null;

    case "self":
      return (
        <Text className="text-gray-11">
          Self-referential props are not supported in this view
        </Text>
      );

    default:
      return null;
  }
};

const ListPropField = ({
  prop,
  values,
  onChange,
}: {
  prop: PropSchema;
  values: BasePropValue[];
  onChange: (values: BasePropValue[]) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {values.map((value, index) => (
        <div
          key={`props-schema-field-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }`}
          className="flex gap-2 items-center"
        >
          <div className="flex-1">
            <PropField
              prop={prop}
              showTitle={false}
              value={value}
              onChange={(newValue) => {
                const newValues = [...values];
                newValues[index] = newValue;
                onChange(newValues);
              }}
            />
          </div>
          <Button
            variant="ghost"
            color="gray"
            size="1"
            onClick={() => {
              onChange(values.filter((_, i) => i !== index));
            }}
          >
            <Icons.Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="soft"
        color="gray"
        onClick={() => {
          onChange([...values, getDefaultValueForType(prop.propType)]);
        }}
      >
        <Icons.Plus className="w-4 h-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};

const getDefaultValueForType = (type: PropsType): BasePropValue => {
  switch (type) {
    case "text":
      return "";
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "dropdown":
      return "";
    case "object":
      return {};
    case "self":
      return null;
    default:
      return null;
  }
};
