import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextArea } from "@v1/ui/text-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { fieldFontSize, infoIconSize, tooltipProps } from "./constants";
import type { FieldOnChangeProps } from "./types";

interface StringFieldElementProps {
  label: string;
  placeholder?: string;
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
          "text-gray-10  flex gap-1 pt-1 items-center h-fit",
          fieldFontSize,
          labelClassName,
        )}
      >
        {label}
        {fieldInfo && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Icons.InfoCircle className={infoIconSize} />
            </TooltipTrigger>
            <TooltipContent {...tooltipProps}>{fieldInfo}</TooltipContent>
          </Tooltip>
        )}
      </Text>
      <TextArea
        className={clsx("shadow-none border border-outline-01", fieldFontSize)}
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
