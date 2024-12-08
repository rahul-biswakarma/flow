import { HoverCard } from "@v1/ui/hover-card";
import { TextField } from "@v1/ui/text-field";
import convert from "color-convert";
import debounce from "lodash/debounce";
import type React from "react";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
}) => {
  const [color, setColor] = useState("#000000");
  const [inputColor, setInputColor] = useState("#000000");
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    const { hex, alpha } = parseColor(value);
    if (hex !== color || Math.round(alpha * 100) !== opacity) {
      setColor(hex);
      setInputColor(hex);
      setOpacity(Math.round(alpha * 100));
    }
  }, [value]);

  const handleColorChange = (newColor: string) => {
    if (newColor !== color) {
      setColor(newColor);
      setInputColor(newColor);
      updateColor(newColor, opacity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleColorChange(inputColor);
    }
  };

  const handleInputBlur = () => {
    handleColorChange(inputColor);
  };

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
    updateColor(color, newOpacity);
  };

  const updateColor = (hex: string, opacityValue: number) => {
    try {
      const rgb = convert.hex.rgb(hex);
      const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacityValue / 100})`;
      onChange(rgba);
    } catch (error) {
      console.error("Error converting color:", error);
      onChange("rgba(0, 0, 0, 1)");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <TextField.Root
        className="w-full shadow-none"
        value={inputColor}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
      >
        <TextField.Slot>
          <HoverCard.Root>
            <HoverCard.Trigger>
              <div className="w-5 h-5 border border-outline-02 rounded-sm overflow-hidden cursor-default">
                <div
                  className="w-full h-full rounded-sm"
                  style={{
                    backgroundColor: color,
                    opacity: opacity / 100,
                  }}
                />
              </div>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth="300px">
              <div>
                <HexColorPicker
                  color={color}
                  onChange={debounce(handleColorChange, 500)}
                />
              </div>
            </HoverCard.Content>
          </HoverCard.Root>
        </TextField.Slot>
        <TextField.Slot>
          <TextField.Root
            className="shadow-none !bg-transparent w-[90px] outline-none text-right"
            value={opacity}
            type="number"
            max={100}
            min={0}
            onChange={(e) => handleOpacityChange(Number(e.target.value))}
          >
            <TextField.Slot />
            <TextField.Slot>%</TextField.Slot>
          </TextField.Root>
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
};

function parseColor(color: string): { hex: string; alpha: number } {
  let hex = "#000000";
  let alpha = 1;

  if (color.startsWith("#")) {
    hex =
      color.length === 4
        ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        : color;
    alpha = 1;
  } else if (color.startsWith("rgb")) {
    const match = color.match(/(\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?/);
    if (match) {
      const r = Number.parseInt(match[1] || "0", 10);
      const g = Number.parseInt(match[2] || "0", 10);
      const b = Number.parseInt(match[3] || "0", 10);
      hex = `#${convert.rgb.hex([r, g, b])}`;
      alpha = match[4] ? Number.parseFloat(match[4]) : 1;
    }
  }

  return { hex, alpha };
}
