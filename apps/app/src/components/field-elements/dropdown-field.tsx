import { Button } from "@v1/ui/button";
import { DropdownMenu } from "@v1/ui/dropdown";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { tooltipProps } from "./constants";
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
}

export const DropdownFieldElement = ({
  label,
  value,
  options,
  fieldInfo,
  labelClassName,
  onChange,
  placeholder,
}: DropdownFieldElementProps) => {
  return (
    <>
      {label && (
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
      )}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color="gray" variant="soft" size="2">
            {placeholder && !value && (
              <Text size="2" className="text-gray-11">
                {placeholder}
              </Text>
            )}
            {value ?? ""}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {options.map((option) => (
            <DropdownMenu.Item
              disabled={option.disabled}
              textValue={option.value}
              key={`${option.value}_${label}`}
              className="flex items-center gap-2"
              onSelect={() => {
                onChange({
                  isEmpty: !option.value,
                  type: "option",
                  value: option,
                });
              }}
            >
              {option.label}
              {option.info && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icons.Info className="!w-[16px] !h-[16px]" />
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
