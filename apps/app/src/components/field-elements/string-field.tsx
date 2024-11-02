import { Text } from "@v1/ui/text";
import { TextArea } from "@v1/ui/text-area";
import type { FieldOnChangeProps } from "./types";

interface StringFieldElementProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: FieldOnChangeProps<string>) => void;
}

export const StringFieldElement = ({
  label,
  placeholder,
  value,
  onChange,
}: StringFieldElementProps) => {
  return (
    <>
      <Text className="text-gray-10" size="2">
        {label}
      </Text>
      <TextArea
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
