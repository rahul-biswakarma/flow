import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import type { FieldOnChangeProps } from "./types";

interface TextFieldElementProps {
  label: string;
  placeholder?: string;
  value: string;
  fieldInfo?: string;
  onChange?: (e: FieldOnChangeProps<string>) => void;
}

export const TextFieldElement = ({
  label,
  placeholder,
  value,
  fieldInfo,
  onChange,
}: TextFieldElementProps) => {
  return (
    <>
      <Text
        className="text-gray-10 pt-1 flex gap-1 items-center h-fit"
        size="2"
      >
        {label}
        {fieldInfo && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Icons.Info className="!w-[16px] !h-[16px]" />
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              {fieldInfo}
            </TooltipContent>
          </Tooltip>
        )}
      </Text>
      <TextField.Root
      
        value={value}
        onChange={(e) =>
          onChange?.({
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
