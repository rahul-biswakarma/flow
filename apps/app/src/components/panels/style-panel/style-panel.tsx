import { Icons } from "@v1/ui/icons";
import { SegmentedControl } from "@v1/ui/segmented-control";
import type React from "react";

import "./style-panel.css";

export const StylePanel: React.FC = () => {
  return (
    <div className="style-editor">
      <section>
        <h3>Position</h3>
        <div className="flex">
          <SegmentedControl.Root defaultValue="horizontal-alignment">
            <SegmentedControl.Item value="left">
              <Icons.AlignStartHorizontal />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="center">
              <Icons.AlignCenterHorizontal />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="right">
              <Icons.AlignEndHorizontal />
            </SegmentedControl.Item>
          </SegmentedControl.Root>
          <SegmentedControl.Root defaultValue="vertical-alignment">
            <SegmentedControl.Item value="top">
              <Icons.AlignStartVertical />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="center">
              <Icons.AlignCenterVertical />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="bottom">
              <Icons.AlignEndVertical />
            </SegmentedControl.Item>
          </SegmentedControl.Root>
        </div>
      </section>
    </div>
  );
};
