import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import type { FieldOnChangeProps } from "./types";

interface TextFieldElementProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: FieldOnChangeProps<string>) => void;
}

export const TextFieldElement = ({
  label,
  placeholder,
  value,
  onChange,
}: TextFieldElementProps) => {
  return (
    <>
      <Text className="text-gray-10 pt-1" size="2">
        {label}
      </Text>
      <TextField.Root
        value={value}
        onChange={(e) =>
          onChange({
            isEmpty: !e.target.value,
            type: "string",
            value: e.target.value,
          })
        }
        placeholder={placeholder}
      />
    </>
  );
};
