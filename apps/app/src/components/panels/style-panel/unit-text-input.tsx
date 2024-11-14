import { TOOLTIP_DELAY_DURATION } from "@/constants";
import { Button } from "@v1/ui/button";
import { DropdownMenu } from "@v1/ui/dropdown";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import type React from "react";
import { useState } from "react";

interface UnitTextInputProps {
  slotValue?: React.ReactNode;
  value: string;
  handleChange: (value: string) => void;
  tooltipContent?: React.ReactNode;
  units?: string[];
  presets?: { label: string; value: string }[];
  error?: boolean;
}

export const UnitTextInput = ({
  slotValue,
  value,
  handleChange,
  tooltipContent,
  units = ["px", "rem", "em", "%"],
  presets,
  error,
}: UnitTextInputProps) => {
  const [currentUnit, setCurrentUnit] = useState(() => {
    const match = value.match(/[a-z%]+$/);
    return match ? match[0] : units[0];
  });

  const numericValue = Number.parseFloat(value) || 0;

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      handleChange(`0${currentUnit}`);
      return;
    }
    const numeric = Number.parseFloat(newValue);
    if (!Number.isNaN(numeric)) handleChange(`${numeric}${currentUnit}`);
  };

  const handleUnitChange = (newUnit: string) => {
    setCurrentUnit(newUnit);
    handleChange(numericValue + newUnit);
  };

  return (
    <Tooltip delayDuration={TOOLTIP_DELAY_DURATION}>
      <TooltipTrigger>
        <TextField.Root
          value={numericValue}
          onChange={handleNumericChange}
          className={clsx("shadow-none", { "border-red-7": error })}
        >
          <TextField.Slot>
            <Text size="2" className="lowercase">
              {slotValue}
            </Text>
          </TextField.Slot>
          {(units.length > 0 || presets) && (
            <TextField.Slot>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button color="gray" variant="ghost" size="2">
                    {currentUnit}
                    <Icons.ChevronDown className="size-3 ml-1" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  {presets?.map((preset) => (
                    <DropdownMenu.Item
                      key={preset.value}
                      onClick={() => handleChange(preset.value)}
                    >
                      {preset.label}
                    </DropdownMenu.Item>
                  ))}
                  {presets && units.length > 0 && <DropdownMenu.Separator />}
                  {units.map((unit) => (
                    <DropdownMenu.Item
                      key={unit}
                      onClick={() => handleUnitChange(unit)}
                    >
                      {unit}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </TextField.Slot>
          )}
        </TextField.Root>
      </TooltipTrigger>
      {tooltipContent && <TooltipContent>{tooltipContent}</TooltipContent>}
    </Tooltip>
  );
};
