import { Flex, Grid, RadioCards, Text, Tooltip } from "@radix-ui/themes";
import { themePropDefs } from "@radix-ui/themes/dist/cjs/components/theme.props";

import { useEffect, useState } from "react";

import { RadioCardItemWrapper } from "../common/radio-card-wrapper";
import styles from "../styles/project-config-widget.module.css";

import { useProjectContext } from "@/libs/context";

export const ThemeOptionRenderer = () => {
  const { setProjectConfig } = useProjectContext();

  const [accentColor, setAccentColor] = useState("blue" as string);
  const [grayColor, setGrayColor] = useState("auto" as string);
  const [appearance, setAppearance] = useState("dark" as string);
  const [panelBackground, setPanelBackground] = useState(
    "translucent" as string,
  );
  const [scale, setScale] = useState("100%" as string);

  useEffect(() => {
    setProjectConfig({
      accentColor,
      gray: grayColor,
      appearance,
      panelBackground,
      scale,
    });
  }, [accentColor, grayColor, appearance, panelBackground, scale]);

  return (
    <Flex direction="column" gap="4">
      {/* Appearance */}
      <Flex direction="column" gap="2">
        <Text className={styles.sectionTitle}>Appearance</Text>
        <RadioCards.Root
          color="gray"
          defaultValue={appearance}
          gap="2"
          onValueChange={(value) => setAppearance(value)}
        >
          <RadioCardItemWrapper icon={IconSun} value="light">
            <Text size="1">Light</Text>
          </RadioCardItemWrapper>
          <RadioCardItemWrapper icon={IconMoonStars} value="dark">
            <Text size="1">Dark</Text>
          </RadioCardItemWrapper>
        </RadioCards.Root>
      </Flex>
      {/* Panel Background */}
      <Flex direction="column" gap="2">
        <Text className={styles.sectionTitle}>Panel Background</Text>
        <RadioCards.Root
          color="gray"
          defaultValue={panelBackground}
          gap="2"
          onValueChange={(value) => setPanelBackground(value)}
        >
          <RadioCardItemWrapper icon={IconCircleFilled} value="solid">
            <Text size="1">Solid</Text>
          </RadioCardItemWrapper>
          <RadioCardItemWrapper icon={IconCircle} value="translucent">
            <Text size="1">Translucent</Text>
          </RadioCardItemWrapper>
        </RadioCards.Root>
      </Flex>
      {/* Scale */}
      <Flex direction="column" gap="2">
        <Text className={styles.sectionTitle}>Panel Background</Text>
        <RadioCards.Root
          color="gray"
          columns="repeat(auto-fit, minmax(30px, 1fr))"
          defaultValue={scale}
          gap="2"
          onValueChange={(value) => setScale(value)}
        >
          {themePropDefs.scaling.values.map((scale) => (
            <RadioCardItemWrapper key={scale} value={scale}>
              <Text size="1">{scale}</Text>
            </RadioCardItemWrapper>
          ))}
        </RadioCards.Root>
      </Flex>

      {/* Accent Color */}
      <Flex direction="column" gap="2">
        <Text className={styles.sectionTitle}>Accent Color</Text>
        <Grid
          aria-labelledby="accent-color-title"
          columns="10"
          gap="2"
          role="group"
        >
          {themePropDefs.accentColor.values.map((color) => (
            <label
              key={color}
              className="rt-ThemePanelSwatch"
              style={{ backgroundColor: `var(--${color}-9)` }}
            >
              <Tooltip
                content={
                  <Text style={{ textTransform: "capitalize" }}>{color}</Text>
                }
              >
                <input
                  checked={accentColor === color}
                  className="rt-ThemePanelSwatchInput"
                  name="accentColor"
                  type="radio"
                  value={color}
                  onChange={(event) =>
                    setAccentColor(event.target.value as typeof accentColor)
                  }
                />
              </Tooltip>
            </label>
          ))}
        </Grid>
      </Flex>

      {/* Gray Color */}
      <Flex direction="column" gap="2">
        <Text className={styles.sectionTitle}>Gray Color</Text>
        <Grid
          aria-labelledby="gray-color-title"
          columns="10"
          gap="2"
          role="group"
        >
          {themePropDefs.grayColor.values.map((gray) => (
            <Flex key={gray} asChild align="center" justify="center">
              <label
                className="rt-ThemePanelSwatch"
                style={{
                  backgroundColor: `var(--${gray}-9)`,
                }}
              >
                <Tooltip
                  content={
                    <Text style={{ textTransform: "capitalize" }}>{gray}</Text>
                  }
                >
                  <input
                    checked={grayColor === gray}
                    className="rt-ThemePanelSwatchInput"
                    name="grayColor"
                    type="radio"
                    value={gray}
                    onChange={(event) =>
                      setGrayColor(event.target.value as typeof grayColor)
                    }
                  />
                </Tooltip>
              </label>
            </Flex>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};
