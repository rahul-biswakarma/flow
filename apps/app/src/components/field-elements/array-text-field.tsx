import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { tooltipProps } from "./constants";
import type { FieldOnChangeProps } from "./types";
import { ArrayValueRenderer } from "./utils/array-value-renderer";

interface ArrayTextFieldElementProps {
  label: string;
  placeholder: string;
  labelClassName?: string;
  value: string[];
  fieldInfo?: string;
  onChange: (e: FieldOnChangeProps<string[]>) => void;
}

export const ArrayTextFieldElement = ({
  label,
  placeholder,
  value,
  labelClassName,
  fieldInfo,
  onChange,
}: ArrayTextFieldElementProps) => {
  return (
    <>
      <Text
        className={clsx(
          "text-gray-10 pt-1 flex gap-1 items-center h-fit",
          labelClassName,
        )}
        size="2"
      >
        {label}
        {fieldInfo && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Icons.Info className="!w-[16px] !h-[16px]" />
            </TooltipTrigger>
            <TooltipContent {...tooltipProps}>{fieldInfo}</TooltipContent>
          </Tooltip>
        )}
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
            autoFocus={value.length > 0}
            className="grow p-0 shadow-none"
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
