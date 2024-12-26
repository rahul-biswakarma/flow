import { clsx } from "clsx";
import React from "react";

import {
  Text,
  TextField,
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

interface TextFieldElementProps {
  ref?: React.RefObject<HTMLInputElement | null>;
  label?: string;
  placeholder?: string;
  value: string;
  fieldInfo?: string;
  labelClassName?: string;
  onChange?: (e: FieldOnChangeProps<string>) => void;
  type?: "text" | "number";
  required?: boolean;
}

export const TextFieldElement: React.FC<TextFieldElementProps> = React.memo(
  ({
    label,
    placeholder,
    value,
    fieldInfo,
    onChange,
    labelClassName,
    ref,
    type,
    required,
  }) => {
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
          type={type}
          required={required}
          ref={ref}
          className={clsx(fieldStyles, fieldFontSize)}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </>
    );
  },
);
