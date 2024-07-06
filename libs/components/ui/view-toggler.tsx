import { SegmentedControl } from '@radix-ui/themes';

import { CanvasViewMode } from '@/libs/types';

export const ViewToggler = ({
  setViewMode,
  viewMode,
}: {
  setViewMode: (view: CanvasViewMode) => void;
  viewMode: CanvasViewMode;
}) => {
  return (
    <SegmentedControl.Root defaultValue={viewMode} onValueChange={(view: CanvasViewMode) => setViewMode(view)}>
      <SegmentedControl.Item value="node">Node</SegmentedControl.Item>
      <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
      <SegmentedControl.Item value="both">Both</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
};
