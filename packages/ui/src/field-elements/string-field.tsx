import { clsx } from "clsx";
import {
  Text,
  TextArea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components";
import { Icons } from "../icons";
import {
  fieldFontSize,
  fieldStyles,
  infoIconSize,
  tooltipProps,
} from "./constants";
import type { FieldOnChangeProps } from "./types";

interface StringFieldElementProps {
  label?: string;
  placeholder?: string;
  value: string;
  fieldInfo?: string;
  labelClassName?: string;
  onChange: (e: FieldOnChangeProps<string>) => void;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
}

export const StringFieldElement = ({
  label,
  placeholder,
  value,
  onChange,
  labelClassName,
  fieldInfo,
  ref,
}: StringFieldElementProps) => {
  return (
    <>
      <Text
        className={clsx(
          "text-gray-11 flex gap-1 pt-1 items-center h-fit",
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
        ref={ref}
        className={clsx(fieldStyles, fieldFontSize)}
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
