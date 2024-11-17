import { Button } from "@v1/ui/button";
import { DropdownMenu } from "@v1/ui/dropdown";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { fieldFontSize, infoIconSize, tooltipProps } from "./constants";
import type { FieldOnChangeProps } from "./types";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
  info?: string;
};

interface DropdownFieldElementProps {
  label?: string;
  value?: string;
  options: Option[];
  fieldInfo?: string;
  placeholder?: string;
  labelClassName?: string;
  onChange: (e: FieldOnChangeProps<Option>) => void;
  dropdownKey?: string;
}

export const DropdownFieldElement = ({
  label,
  value,
  options,
  fieldInfo,
  labelClassName,
  onChange,
  placeholder,
  dropdownKey,
}: DropdownFieldElementProps) => {
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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color="gray" variant="soft" size="1">
            {placeholder && !value && (
              <Text className={clsx("text-gray-11 capitalize", fieldFontSize)}>
                {placeholder}
              </Text>
            )}
            <Text className={clsx("text-gray-11 capitalize", fieldFontSize)}>
              {value ?? ""}
            </Text>
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {options.map((option) => (
            <DropdownMenu.Item
              disabled={option.disabled}
              textValue={option.value}
              key={`${dropdownKey}_${option.value}`}
              className="flex items-center gap-2"
              onSelect={() => {
                onChange({
                  isEmpty: !option.value,
                  type: "option",
                  value: option,
                });
              }}
            >
              <Text className={clsx("capitalize", fieldFontSize)}>
                {option.label}
              </Text>
              {option.info && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icons.InfoCircle className={infoIconSize} />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center">
                    {option.info}
                  </TooltipContent>
                </Tooltip>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};
