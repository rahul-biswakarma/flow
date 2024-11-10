import { Icons } from "@v1/ui/icons";
import { SegmentedControl } from "@v1/ui/segmented-control";
import { Text } from "@v1/ui/text";

import "./style-panel.css";
import type { ReactNode } from "react";
import type React from "react";
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
          defaultValue="row"
        >
          <SegmentedControl.Item value="row">
            <IconRenderer>
              <Icons.ArrowRight />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="col">
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
          id="justify"
          size="1"
          className="w-full"
          defaultValue="start"
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
              <Icons.AlignHorizontalSpaceBetween />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="end">
            <IconRenderer>
              <Icons.AlignEndHorizontal />
            </IconRenderer>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <SegmentedControl.Root
          id="align"
          size="1"
          className="w-full"
          defaultValue="start"
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
              <Icons.AlignVerticalSpaceBetween />
            </IconRenderer>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="end">
            <IconRenderer>
              <Icons.AlignEndVertical />
            </IconRenderer>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
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

const LabelRenderer = ({ content }: { content: string }) => {
  return (
    <Text size="2" className="text-gray-10">
      {content}
    </Text>
  );
};
