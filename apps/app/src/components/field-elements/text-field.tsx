import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import React from "react";
import { infoIconSize, tooltipProps } from "./constants";
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
              "text-gray-10  flex gap-1 items-center h-fit",
              labelClassName,
            )}
            size="1"
          >
            {label}
            {fieldInfo && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Icons.Info className={infoIconSize} />
                </TooltipTrigger>
                <TooltipContent {...tooltipProps}>{fieldInfo}</TooltipContent>
              </Tooltip>
            )}
          </Text>
        )}
        <TextField.Root
          className="shadow-none"
          size="1"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </>
    );
  },
);
