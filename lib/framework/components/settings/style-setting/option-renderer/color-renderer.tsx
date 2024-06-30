'use client';

import React from 'react';
import { Box, Grid, Popover, Text } from '@radix-ui/themes';
import 'react-color-palette/css';
import { ColorPicker, useColor } from 'react-color-palette';

interface ColorRendererProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export const ColorRenderer: React.FC<ColorRendererProps> = ({ label, value = '#000000', onChange }) => {
  const [color, setColor] = useColor(value);

  return (
    <>
      <Text>{label}</Text>
      <Popover.Root>
        <Popover.Trigger>
          <Grid
            align="center"
            columns="auto 1fr"
            gap="2"
            style={{
              background: 'var(--gray-4)',
              padding: '4px',
              borderRadius: 'var(--radius-2)',
              cursor: 'pointer',
            }}
          >
            <Box
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: color.hex,
                borderRadius: 'var(--radius-2)',
              }}
            />
            <Text>{color.hex}</Text>
          </Grid>
        </Popover.Trigger>
        <Popover.Content width="360px">
          <ColorPicker
            color={color}
            onChange={(color) => {
              setColor(color);
              onChange(color.hex);
            }}
          />
        </Popover.Content>
      </Popover.Root>
    </>
  );
};
