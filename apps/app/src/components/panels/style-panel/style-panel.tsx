import { Icons } from "@v1/ui/icons";
import { SegmentedControl } from "@v1/ui/segmented-control";
import { Text } from "@v1/ui/text";

import "./style-panel.css";
import { IconButton } from "@v1/ui/icon-button";
import type { ReactNode } from "react";
import type React from "react";
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
        <LabelRenderer content="Layout" />
        <div className="w-full flex gap-2">
          <UnitTextInput
            slotValue="w"
            value={styleValue.width ?? "auto"}
            handleChange={(value) =>
              setStyleValue((prev) => ({ ...prev, width: value }))
            }
          />
          <UnitTextInput
            slotValue="h"
            value={styleValue.height ?? "auto"}
            handleChange={(value) => {
              setStyleValue((prev) => ({ ...prev, height: value }));
            }}
          />
        </div>
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
          <SegmentedControl.Item value="row">
            <IconRenderer>
              <Icons.ArrowRight />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="column">
            <IconRenderer>
              <Icons.ArrowDown />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="wrap">
            <IconRenderer>
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
            <IconRenderer>
              <Icons.AlignStartVertical />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="center">
            <IconRenderer>
              <Icons.AlignCenterVertical />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="stretch">
            <IconRenderer>
              <Icons.AlignHorizontalSpaceBetween />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="end">
            <IconRenderer>
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
            <IconRenderer>
              <Icons.AlignStartHorizontal />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="center">
            <IconRenderer>
              <Icons.AlignCenterHorizontal />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="space-between">
            <IconRenderer>
              <Icons.AlignVerticalSpaceBetween />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="end">
            <IconRenderer>
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

const IconRenderer = ({ children }: { children: ReactNode }) => {
  return (
    <span className="h-full w-full flex items-center justify-center text-gray-11">
      {children}
    </span>
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
