import type { Theme } from "@/types";
import { Button } from "@v1/ui/button";
import { Text } from "@v1/ui/text";
import {
  themeAccentColors,
  themeAppearance,
  themeGrayColors,
  themePanelBackground,
  themeScaling,
} from "@v1/ui/theme-data";

import { Tooltip } from "@v1/ui/tooltip";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";

type ThemeOptionRendererProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeEditor: React.FC<ThemeOptionRendererProps> = ({
  theme,
  setTheme,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Appearance */}
      <div className="flex flex-col gap-2">
        <Text className="text-lg font-semibold">Appearance</Text>
        <div className="flex gap-2">
          {themeAppearance.map((value) => (
            <Button
              key={value}
              className="flex items-center gap-2 p-2 rounded"
              onClick={() => setTheme({ appearance: value })}
            >
              <Text size="1">{value}</Text>
            </Button>
          ))}
        </div>
      </div>

      {/* Panel Background */}
      <div className="flex flex-col gap-2">
        <Text className="text-lg font-semibold">Panel Background</Text>
        <div className="flex gap-2">
          {themePanelBackground.map((value) => (
            <Button
              key={value}
              className="flex items-center gap-2 p-2 rounded"
              onClick={() => setTheme({ panelBackground: value })}
            >
              <Text size="1">{value}</Text>
            </Button>
          ))}
        </div>
      </div>

      {/* Scale */}
      <div className="flex flex-col gap-2">
        <Text className="text-lg font-semibold">Scale</Text>
        <div className="grid grid-cols-5 gap-2">
          {themeScaling.map((scale) => (
            <Button
              key={scale}
              className="p-2 rounded"
              onClick={() => setTheme({ scale })}
            >
              <Text size="1">{scale}</Text>
            </Button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div className="flex flex-col gap-2">
        <Text className="text-lg font-semibold">Accent Color</Text>
        <div className="flex flex-wrap gap-2">
          {themeAccentColors.map((color) => (
            <Tooltip
              key={color}
              content={
                <Text style={{ textTransform: "capitalize" }}>{color}</Text>
              }
            >
              <Button
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: `var(--${color}-9)` }}
                onClick={() => setTheme({ accentColor: color })}
              />
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Gray Color */}
      <div className="flex flex-col gap-2">
        <Text className="text-lg font-semibold">Gray Color</Text>
        <div className="flex gap-2">
          {themeGrayColors.map((gray) => (
            <Tooltip
              key={gray}
              content={
                <Text style={{ textTransform: "capitalize" }}>{gray}</Text>
              }
            >
              <Button
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: `var(--${gray}-9)` }}
                onClick={() => setTheme({ grayColor: gray })}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};
