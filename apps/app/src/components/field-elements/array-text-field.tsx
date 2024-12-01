import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { type RefObject, useState } from "react";
import {
  fieldFontSize,
  fieldStyles,
  infoIconSize,
  tooltipProps,
} from "./constants";
import type { FieldOnChangeProps } from "./types";
import { ArrayValueRenderer } from "./utils/array-value-renderer";

interface ArrayTextFieldElementProps {
  label: string;
  placeholder?: string;
  labelClassName?: string;
  value: string[];
  fieldInfo?: string;
  onChange: (e: FieldOnChangeProps<string[]>) => void;
  isStreaming?: boolean;
  ref?: RefObject<HTMLDivElement>;
}

export const ArrayTextFieldElement = ({
  label,
  placeholder,
  value,
  labelClassName,
  fieldInfo,
  onChange,
  isStreaming,
  ref,
}: ArrayTextFieldElementProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Text
        className={clsx(
          "text-gray-11 pt-1 flex gap-1 items-center h-fit",
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
      <ArrayValueRenderer<string>
        ref={ref}
        value={value}
        isStreaming={isStreaming}
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
            className={clsx(
              "grow p-0 !bg-transparent",
              fieldStyles,
              fieldFontSize,
              {
                "!border-none !outline-none": value.length > 0,
              },
              { "!w-0": isStreaming },
            )}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isStreaming) {
                e.preventDefault();
                if (inputValue.trim() !== "") {
                  onChange({
                    isEmpty: false,
                    type: "string[]",
                    value: [...value, inputValue],
                  });
                  setInputValue("");
                }
              }
            }}
            placeholder={placeholder}
            disabled={isStreaming}
          />
        }
      />
    </>
  );
};
