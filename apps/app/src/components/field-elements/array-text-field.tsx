import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { ArrayValueRenderer } from "./array-value-renderer";
import type { FieldOnChangeProps } from "./types";

interface ArrayTextFieldElementProps {
  label: string;
  placeholder: string;
  value: string[];
  onChange: (e: FieldOnChangeProps<string[]>) => void;
}

export const ArrayTextFieldElement = ({
  label,
  placeholder,
  value,
  onChange,
}: ArrayTextFieldElementProps) => {
  return (
    <>
      <Text className="text-gray-10 pt-1" size="2">
        {label}
      </Text>
      <ArrayValueRenderer<string>
        value={value}
        valueRender={(value: string) => <Text size="2">{value}</Text>}
        removeItem={(discardedValue) => {
          const newValue = value.filter((v) => v !== discardedValue);
          onChange({
            isEmpty: newValue.length === 0,
            type: "string[]",
            value: newValue,
          });
        }}
        inputRenderer={
          <TextField.Root
            autoFocus
            className="grow p-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onChange({
                  isEmpty: false,
                  type: "string[]",
                  value: [...value, e.currentTarget.value],
                });
                e.currentTarget.value = "";
              }
            }}
            placeholder={placeholder}
          />
        }
      />
    </>
  );
};
