import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextArea } from "@v1/ui/text-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { tooltipProps } from "./constants";
import type { FieldOnChangeProps } from "./types";

interface StringFieldElementProps {
  label: string;
  placeholder: string;
  value: string;
  fieldInfo?: string;
  labelClassName?: string;
  onChange: (e: FieldOnChangeProps<string>) => void;
}

export const StringFieldElement = ({
  label,
  placeholder,
  value,
  onChange,
  labelClassName,
  fieldInfo,
}: StringFieldElementProps) => {
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
      <TextArea
        className="shadow-none"
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
