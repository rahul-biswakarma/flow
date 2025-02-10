import { clsx } from "clsx";
import {
  Button,
  DropdownMenu,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components";
import { Icons } from "../icons";
import { fieldFontSize, infoIconSize, tooltipProps } from "./constants";
import type { FieldOnChangeProps } from "./types";

export type Option = {
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
  triggerSize?: "1" | "2" | "3";
}

export const DropdownFieldElement = ({
  label,
  value,
  options,
  fieldInfo,
  labelClassName,
  onChange,
  placeholder = "Select option",
  dropdownKey,
  triggerSize = "2",
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
          <Button
            color="gray"
            variant="soft"
            size={triggerSize}
            className="flex justify-between"
          >
            {placeholder && !value && (
              <Text className={clsx("text-gray-8", fieldFontSize)}>
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
