import { TOOLTIP_DELAY_DURATION } from "@/constants";
import { Icons } from "@v1/ui/icons";
import { SegmentedControl } from "@v1/ui/segmented-control";
import { Text } from "@v1/ui/text";
import { Toggle } from "@v1/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { useState } from "react";
import { BorderControl, BorderRadiusControl } from "./border-control";
import { ColorPicker } from "./color-picker";
import { FontFamilySelect } from "./font-family-select";
import { PropertyToggle } from "./property-toggle";
import type { StyleData } from "./type";
import { UnitTextInput } from "./unit-text-input";
import "./style-panel.css";
import { IconButton } from "@v1/ui/icon-button";
import { Section } from "../common/section";

const DIMENSION_UNITS = ["px", "rem", "%"];
const SPACING_UNITS = ["px", "rem", "em"];
const FONT_SIZE_UNITS = ["px", "rem", "em", "%"];

const DIMENSION_PRESETS = [
  { label: "Auto", value: "auto" },
  { label: "Fit", value: "fit-content" },
  { label: "Full", value: "100%" },
];

export const StylePanel = ({
  styleValue,
  setStyleValue,
}: {
  styleValue: StyleData;
  setStyleValue: React.Dispatch<React.SetStateAction<StyleData>>;
}) => {
  const [borderUnified, setBorderUnified] = useState(true);
  const updateStyle = (updates: Partial<StyleData>) => {
    setStyleValue((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="style-editor flex flex-col gap-6 w-full h-full">
      <Section
        title="Layout"
        actions={
          <IconButton
            variant="ghost"
            size="2"
            color="gray"
            className={
              styleValue.display !== "flex" ? "text-gray-10" : "text-accent-12"
            }
            onClick={() => {
              styleValue.display === "flex"
                ? updateStyle({ display: "block" })
                : updateStyle({ display: "flex" });
            }}
          >
            {styleValue.display === "flex" ? (
              <Icons.Layout />
            ) : (
              <Icons.LayoutOff />
            )}
          </IconButton>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <UnitTextInput
              slotValue="W"
              tooltipContent="Width"
              value={styleValue.width ?? "auto"}
              handleChange={(v) => updateStyle({ width: v })}
              units={DIMENSION_UNITS}
              presets={DIMENSION_PRESETS}
            />
            <UnitTextInput
              slotValue="H"
              tooltipContent="Height"
              value={styleValue.height ?? "auto"}
              handleChange={(v) => updateStyle({ height: v })}
              units={DIMENSION_UNITS}
              presets={DIMENSION_PRESETS}
            />
          </div>

          {styleValue.display === "flex" && (
            <div className="row-style-fields">
              <FlexControls value={styleValue} onChange={updateStyle} />
            </div>
          )}
        </div>
      </Section>

      <Section title="Spacing">
        <div className="grid grid-cols-2 gap-2">
          <UnitTextInput
            slotValue={<Icons.BoxMargin />}
            tooltipContent="Padding"
            value={styleValue.padding ?? "0"}
            handleChange={(v) => updateStyle({ padding: v })}
            units={SPACING_UNITS}
          />
          <UnitTextInput
            slotValue={<Icons.BoxPadding />}
            tooltipContent="Margin"
            value={styleValue.margin ?? "0"}
            handleChange={(v) => updateStyle({ margin: v })}
            units={SPACING_UNITS}
          />
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <FontFamilySelect
              value={styleValue.fontFamily ?? "var(--font-geist-sans)"}
              onChange={(v) => updateStyle({ fontFamily: v })}
            />
            <UnitTextInput
              slotValue="Size"
              tooltipContent="Font Size"
              value={styleValue.fontSize ?? "16px"}
              handleChange={(v) => updateStyle({ fontSize: v })}
              units={FONT_SIZE_UNITS}
            />
          </div>

          <div className="row-style-fields">
            <Text size="2" className="text-gray-11">
              Text Align
            </Text>
            <SegmentedControl.Root
              size="2"
              value={styleValue.textAlign ?? "left"}
              onValueChange={(v: "left" | "center" | "right") =>
                updateStyle({ textAlign: v })
              }
            >
              <SegmentedControl.Item value="left">
                <IconRenderer content="Left">
                  <Icons.AlignLeft />
                </IconRenderer>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="center">
                <IconRenderer content="Center">
                  <Icons.AlignCenter />
                </IconRenderer>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="right">
                <IconRenderer content="Right">
                  <Icons.AlignRight />
                </IconRenderer>
              </SegmentedControl.Item>
            </SegmentedControl.Root>
          </div>
        </div>
      </Section>

      <Section title="Colors">
        <div className="flex flex-col gap-2 pt-1">
          <PropertyToggle
            label="Background Color"
            enabled={styleValue.backgroundColor !== undefined}
            onToggle={() =>
              updateStyle({
                backgroundColor: styleValue.backgroundColor
                  ? undefined
                  : "transparent",
              })
            }
          />
          {styleValue.backgroundColor !== undefined && (
            <div className="pb-2">
              <ColorPicker
                value={styleValue.backgroundColor}
                onChange={(v) => updateStyle({ backgroundColor: v })}
              />
            </div>
          )}

          <PropertyToggle
            label="Text Color"
            enabled={styleValue.color !== undefined}
            onToggle={() =>
              updateStyle({
                color: styleValue.color ? undefined : "inherit",
              })
            }
          />
          {styleValue.color !== undefined && (
            <ColorPicker
              value={styleValue.color}
              onChange={(v) => updateStyle({ color: v })}
            />
          )}
        </div>
      </Section>

      <Section
        title="Border"
        actions={
          <>
            {" "}
            <Toggle
              size="sm"
              pressed={borderUnified}
              onPressedChange={() => setBorderUnified(!borderUnified)}
            >
              <Icons.Maximize className="!w-3.5 !h-3.5" />
            </Toggle>
            <IconButton
              variant="ghost"
              color="gray"
              size="2"
              className="text-gray-10"
              onClick={() =>
                updateStyle({
                  borderTopWidth: styleValue.borderTopWidth ? undefined : "0",
                  borderRightWidth: styleValue.borderRightWidth
                    ? undefined
                    : "0",
                  borderBottomWidth: styleValue.borderBottomWidth
                    ? undefined
                    : "0",
                  borderLeftWidth: styleValue.borderLeftWidth ? undefined : "0",
                  borderStyle: styleValue.borderStyle ? undefined : "solid",
                  borderColor: styleValue.borderColor
                    ? undefined
                    : "transparent",
                })
              }
            >
              {styleValue.borderStyle !== undefined ? (
                <Icons.X />
              ) : (
                <Icons.Plus />
              )}
            </IconButton>
          </>
        }
      >
        {styleValue.borderStyle !== undefined && (
          <div className="space-y-4">
            <BorderControl
              unified={borderUnified}
              value={{
                top: styleValue.borderTopWidth,
                right: styleValue.borderRightWidth,
                bottom: styleValue.borderBottomWidth,
                left: styleValue.borderLeftWidth,
              }}
              onChange={(v) =>
                updateStyle({
                  borderTopWidth: v.top,
                  borderRightWidth: v.right,
                  borderBottomWidth: v.bottom,
                  borderLeftWidth: v.left,
                })
              }
            />

            <div className="space-y-2">
              <Text size="2" className="text-gray-11">
                Border Color
              </Text>
              <ColorPicker
                value={styleValue.borderColor ?? "transparent"}
                onChange={(v) => updateStyle({ borderColor: v })}
              />
            </div>

            <div className="row-style-fields">
              <Text size="2" className="text-gray-11">
                Border Style
              </Text>
              <SegmentedControl.Root
                size="2"
                value={styleValue.borderStyle ?? "solid"}
                onValueChange={(v: "solid" | "dashed" | "dotted") =>
                  updateStyle({ borderStyle: v })
                }
              >
                <SegmentedControl.Item value="solid">
                  <div className="w-5 h-[2px] bg-gray-11" />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="dashed">
                  <Icons.LineDashed className="!w-[20px] !h-[20px]" />
                </SegmentedControl.Item>
                <SegmentedControl.Item value="dotted">
                  <Icons.LineDotted className="!w-[20px] !h-[20px]" />
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </div>

            <BorderRadiusControl
              value={{
                topLeft: styleValue.borderTopLeftRadius ?? "0",
                topRight: styleValue.borderTopRightRadius ?? "0",
                bottomRight: styleValue.borderBottomRightRadius ?? "0",
                bottomLeft: styleValue.borderBottomLeftRadius ?? "0",
              }}
              onChange={(v) =>
                updateStyle({
                  borderTopLeftRadius: v.topLeft,
                  borderTopRightRadius: v.topRight,
                  borderBottomRightRadius: v.bottomRight,
                  borderBottomLeftRadius: v.bottomLeft,
                })
              }
              unified={borderUnified}
            />
          </div>
        )}
      </Section>

      {/* <Section title="Effects">
        <div className="space-y-4">
          <PropertyToggle
            label="Shadow"
            enabled={styleValue.boxShadow !== undefined}
            onToggle={() =>
              updateStyle({
                boxShadow: styleValue.boxShadow ? undefined : "none",
              })
            }
          />
          {styleValue.boxShadow !== undefined && (
            <ShadowPicker
              value={styleValue.boxShadow}
              onChange={(v) => updateStyle({ boxShadow: v })}
            />
          )}

          <div className="flex gap-2 items-center">
            <Text size="2" className="text-gray-11">
              Opacity
            </Text>
            <UnitTextInput
              tooltipContent="Opacity"
              value={styleValue.opacity ?? "100%"}
              handleChange={(v) => updateStyle({ opacity: v })}
              units={["%"]}
            />
          </div>
        </div>
      </Section> */}
    </div>
  );
};

const IconRenderer = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content?: string;
}) => {
  return (
    <Tooltip delayDuration={TOOLTIP_DELAY_DURATION}>
      <TooltipTrigger asChild className="w-full h-full">
        <span className="w-full h-full flex items-center justify-center">
          {children}
        </span>
      </TooltipTrigger>
      {content && <TooltipContent>{content}</TooltipContent>}
    </Tooltip>
  );
};

const FlexControls = ({
  value,
  onChange,
}: {
  value: StyleData;
  onChange: (updates: Partial<StyleData>) => void;
}) => {
  return (
    <>
      <Text size="2" className="text-gray-11">
        Direction
      </Text>
      <SegmentedControl.Root
        size="2"
        value={value.flexDirection ?? "row"}
        onValueChange={(v: "row" | "column") => onChange({ flexDirection: v })}
      >
        <SegmentedControl.Item value="row">
          <IconRenderer content="Row">
            <Icons.ArrowRight />
          </IconRenderer>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="column">
          <IconRenderer content="Column">
            <Icons.ArrowDown />
          </IconRenderer>
        </SegmentedControl.Item>
      </SegmentedControl.Root>

      <Text size="2" className="text-gray-11">
        Justify Content
      </Text>
      <SegmentedControl.Root
        size="2"
        value={value.justifyContent ?? "flex-start"}
        onValueChange={(
          v: "flex-start" | "center" | "flex-end" | "space-between",
        ) => onChange({ justifyContent: v })}
      >
        <SegmentedControl.Item value="flex-start">
          <IconRenderer content="Start">
            <Icons.LayoutAlignLeft />
          </IconRenderer>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="center">
          <IconRenderer content="Center">
            <Icons.LayoutAlignMiddle />
          </IconRenderer>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="flex-end">
          <IconRenderer content="End">
            <Icons.LayoutAlignRight />
          </IconRenderer>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="space-between">
          <IconRenderer content="Space Between">
            <Icons.LayoutDistributeVertical />
          </IconRenderer>
        </SegmentedControl.Item>
      </SegmentedControl.Root>

      <Text size="2" className="text-gray-11">
        Align Items
      </Text>
      <SegmentedControl.Root
        size="2"
        value={value.alignItems ?? "stretch"}
        onValueChange={(v: "flex-start" | "center" | "flex-end" | "stretch") =>
          onChange({ alignItems: v })
        }
      >
        <SegmentedControl.Item value="flex-start">
          <IconRenderer content="Start">
            <Icons.LayoutAlignTop />
          </IconRenderer>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="center">
          <IconRenderer content="Center">
            <Icons.LayoutAlignCenter />
          </IconRenderer>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="flex-end">
          <IconRenderer content="End">
            <Icons.LayoutAlignBottom />
          </IconRenderer>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="stretch">
          <IconRenderer content="Stretch">
            <Icons.LayoutDistributeHorizontal />
          </IconRenderer>
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    </>
  );
};
