import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { tooltipProps } from "./constants";
import type { FieldOnChangeProps } from "./types";

interface TextFieldElementProps {
  label: string;
  placeholder?: string;
  value: string;
  fieldInfo?: string;
  labelClassName?: string;
  onChange?: (e: FieldOnChangeProps<string>) => void;
}

export const TextFieldElement = ({
  label,
  placeholder,
  value,
  fieldInfo,
  onChange,
  labelClassName,
}: TextFieldElementProps) => {
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
