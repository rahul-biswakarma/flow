import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import React from "react";
import {
  fieldFontSize,
  fieldStyles,
  infoIconSize,
  tooltipProps,
} from "./constants";
import type { FieldOnChangeProps } from "./types";

interface TextFieldElementProps {
  label?: string;
  placeholder?: string;
  value: string;
  fieldInfo?: string;
  labelClassName?: string;
  onChange?: (e: FieldOnChangeProps<string>) => void;
}

export const TextFieldElement: React.FC<TextFieldElementProps> = React.memo(
  ({ label, placeholder, value, fieldInfo, onChange, labelClassName }) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({
          isEmpty: !e.target.value,
          type: "string",
          value: e.target.value,
        });
      },
      [onChange],
    );

    return (
      <>
        {label && (
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
        )}
        <TextField.Root
          className={clsx(fieldStyles, fieldFontSize)}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </>
    );
  },
);
