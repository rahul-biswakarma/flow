import { Icons } from "@v1/ui/icons";
import { SegmentedControl } from "@v1/ui/segmented-control";
import { Text } from "@v1/ui/text";

import "./style-panel.css";
import { TOOLTIP_DELAY_DURATION } from "@/constants";
import { IconButton } from "@v1/ui/icon-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import type React from "react";
import type { ReactNode } from "react";
import { ColorPicker } from "./color-picker";
import type { StyleData } from "./type";
import { UnitTextInput } from "./unit-text-input";

export const StylePanel = ({
  styleValue,
  setStyleValue,
}: {
  styleValue: StyleData;
  setStyleValue: React.Dispatch<React.SetStateAction<StyleData>>;
}) => {
  return (
    <div className="style-editor">
      <section className="flex flex-col gap-2">
        <div className="w-full flex gap-2">
          <UnitTextInput
            slotValue="w"
            tooltipContent="Width"
            value={styleValue.width ?? "auto"}
            handleChange={(value) =>
              setStyleValue((prev) => ({ ...prev, width: value }))
            }
          />
          <UnitTextInput
            slotValue="h"
            tooltipContent="Height"
            value={styleValue.height ?? "auto"}
            handleChange={(value) => {
              setStyleValue((prev) => ({ ...prev, height: value }));
            }}
          />
        </div>
        <div className="w-full flex gap-2">
          <UnitTextInput
            hideOptionDropdown={true}
            slotValue="x"
            tooltipContent="X-position"
            value={styleValue.x ?? "0"}
            handleChange={(value) =>
              setStyleValue((prev) => ({ ...prev, width: value }))
            }
          />
          <UnitTextInput
            hideOptionDropdown={true}
            slotValue="y"
            tooltipContent="Y-position"
            value={styleValue.y ?? "0"}
            handleChange={(value) => {
              setStyleValue((prev) => ({ ...prev, height: value }));
            }}
          />
        </div>
        <LabelRenderer
          content="Layout"
          rightSlot={
            <IconButton
              variant="ghost"
              color="gray"
              size="1"
              className="text-gray-10"
              onClick={() => {
                if (styleValue.display) {
                  setStyleValue((prev) => {
                    const { display, ...rest } = prev;
                    return rest;
                  });
                } else {
                  setStyleValue((prev) => ({
                    ...prev,
                    display: "flex",
                  }));
                }
              }}
            >
              <Tooltip>
                <TooltipTrigger>
                  <Icons.SquareSquare
                    style={{
                      color: styleValue.display
                        ? "var(--indigo-10)"
                        : "var(--gray-10)",
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>Auto Layout</TooltipContent>
              </Tooltip>
            </IconButton>
          }
        />
        <SegmentedControl.Root
          id="direction"
          size="1"
          className="w-full"
          onValueChange={(value) => {
            if (value === "wrap") {
              setStyleValue((prev) => ({
                ...prev,
                flexDirection: "row",
                flexWrap: "wrap",
              }));
            } else
              setStyleValue((prev) => ({
                ...prev,
                flexDirection: value,
                flexWrap: "no-wrap",
              }));
          }}
        >
          <SegmentedControl.Item value="row" className="w-full">
            <IconRenderer content="Horizontal Layout">
              <Icons.ArrowRight />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="column">
            <IconRenderer content="Vertical Layout">
              <Icons.ArrowDown />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="wrap">
            <IconRenderer content="Wrap">
              <Icons.Undo2 className="transform scale-y-[-1]" />
            </IconRenderer>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <LabelRenderer content="Content Alignment" />
        <SegmentedControl.Root
          id="align"
          size="1"
          className="w-full"
          onValueChange={(value) =>
            setStyleValue((prev) => ({ ...prev, justifyContent: value }))
          }
        >
          <SegmentedControl.Item value="start">
            <IconRenderer content="Align Left">
              <Icons.AlignStartVertical />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="center">
            <IconRenderer content="Align Horizontally Center">
              <Icons.AlignCenterVertical />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="justify-between">
            <IconRenderer content="Align Horizontally Space Between">
              <Icons.AlignHorizontalSpaceBetween />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="end">
            <IconRenderer content="Align Right">
              <Icons.AlignEndVertical />
            </IconRenderer>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <SegmentedControl.Root
          id="justify"
          size="1"
          className="w-full"
          onValueChange={(value) =>
            setStyleValue((prev) => ({
              ...prev,
              alignItems: value,
            }))
          }
        >
          <SegmentedControl.Item value="start">
            <IconRenderer content="Align Top">
              <Icons.AlignStartHorizontal />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="center">
            <IconRenderer content="Align Vertically Center">
              <Icons.AlignCenterHorizontal />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="space-between">
            <IconRenderer content="Align Vertically Space Between">
              <Icons.AlignVerticalSpaceBetween />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="end">
            <IconRenderer content="Align Bottom">
              <Icons.AlignEndHorizontal />
            </IconRenderer>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <LabelRenderer
          content="Background Color"
          rightSlot={
            <IconButton
              variant="ghost"
              color="gray"
              size="1"
              className="text-gray-10"
              onClick={() => {
                if (styleValue.backgroundColor) {
                  setStyleValue((prev) => {
                    const { backgroundColor, ...rest } = prev;
                    return rest;
                  });
                } else {
                  setStyleValue((prev) => ({
                    ...prev,
                    backgroundColor: "#cccccc",
                  }));
                }
              }}
            >
              {styleValue.backgroundColor ? <Icons.X /> : <Icons.Plus />}
            </IconButton>
          }
        />
        {styleValue.backgroundColor && (
          <ColorPicker
            value={styleValue.backgroundColor}
            onChange={(e) =>
              setStyleValue((prev) => ({
                ...prev,
                backgroundColor: e,
              }))
            }
          />
        )}
        <LabelRenderer
          content="Text Color"
          rightSlot={
            <IconButton
              variant="ghost"
              color="gray"
              size="1"
              className="text-gray-10"
              onClick={() => {
                if (styleValue.color) {
                  setStyleValue((prev) => {
                    const { color, ...rest } = prev;
                    return rest;
                  });
                } else {
                  setStyleValue((prev) => ({
                    ...prev,
                    color: "#cccccc",
                  }));
                }
              }}
            >
              {styleValue.color ? <Icons.X /> : <Icons.Plus />}
            </IconButton>
          }
        />
        {styleValue.color && (
          <ColorPicker
            value={styleValue.color}
            onChange={(e) =>
              setStyleValue((prev) => ({
                ...prev,
                color: e,
              }))
            }
          />
        )}
      </section>
    </div>
  );
};

const IconRenderer = ({
  children,
  content,
}: { children: ReactNode; content?: string }) => {
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

const LabelRenderer = ({
  content,
  rightSlot,
}: { content: string; rightSlot?: ReactNode }) => {
  return (
    <div className="flex w-full justify-between items-center">
      <Text size="2" className="text-gray-10">
        {content}
      </Text>
      {rightSlot}
    </div>
  );
};
