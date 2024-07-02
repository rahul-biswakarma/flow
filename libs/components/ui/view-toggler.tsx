import { Box, SegmentedControl } from '@radix-ui/themes';

import { CanvasViewMode } from '../type';

export const ViewToggler = ({
  setViewMode,
  viewMode,
}: {
  setViewMode: (view: CanvasViewMode) => void;
  viewMode: CanvasViewMode;
}) => {
  return (
    <Box
      style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
      }}
    >
      <SegmentedControl.Root defaultValue={viewMode} onValueChange={(view: CanvasViewMode) => setViewMode(view)}>
        <SegmentedControl.Item value="node">Node</SegmentedControl.Item>
        <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
        <SegmentedControl.Item value="node+preview">Both</SegmentedControl.Item>
      </SegmentedControl.Root>
    </Box>
  );
};
