import {
  DropdownMenu,
  Text,
  TextField,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components";
import { Icons } from "@/icons";
import { TOOLTIP_DELAY_DURATION } from "@/utils/constants";

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
  type?: "number" | "text";
}

export const UnitTextInput = ({
  slotValue,
  value,
  handleChange,
  tooltipContent,
  units = ["px", "rem", "em", "%"],
  presets,
  error,
  type,
}: UnitTextInputProps) => {
  const [currentUnit, setCurrentUnit] = useState(() => {
    const match = value.match(/[a-z%]+$/);
    return match ? match[0] : units[0];
  });

  let numericValue: string | number = Number.parseFloat(value) || 0;
  for (const preset of presets || []) {
    if (preset.value === value) {
      numericValue = value;
    }
  }

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      handleChange(`0${currentUnit}`);
      return;
    }
    handleChange(`${newValue}${currentUnit}`);
  };

  const handleUnitChange = (newUnit: string) => {
    let isPresetValue = false;
    setCurrentUnit(newUnit);
    for (const preset of presets || []) {
      if (preset.value === value) {
        isPresetValue = true;
      }
    }
    handleChange((isPresetValue ? "0" : numericValue) + newUnit);
  };

  return (
    <Tooltip delayDuration={TOOLTIP_DELAY_DURATION}>
      <TooltipTrigger>
        <TextField.Root
          type={type}
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
                  <div className="flex items-center hover:bg-gray-a3 rounded-sm h-full px-2 -mr-1.5 cursor-default">
                    {currentUnit}
                    <Icons.ChevronDown className="size-3 ml-1" />
                  </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  {presets?.map((preset, index) => (
                    <DropdownMenu.Item
                      key={`${preset.value}-${index}`}
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
