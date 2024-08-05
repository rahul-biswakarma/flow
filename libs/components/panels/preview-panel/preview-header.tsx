import { Flex, IconButton, Text } from '@radix-ui/themes';
import { IconX } from '@tabler/icons-react';
import React from 'react';

import ResponsiveDropdown from '../../ui/responsive-dropdown';

import { PreviewScaleType } from '@/libs/types';
import { PreviewType } from '@/libs/context';

const previewScaleOptions: PreviewScaleType[] = ['25%', '50%', '75%', '100%', '150%', '200%', '300%'];

type PreviewHeaderProps = {
  previewScale: PreviewScaleType;
  togglePreviewPanel: (value: PreviewType) => void;
  setPreviewScale: (value: PreviewScaleType) => void;
};

export const PreviewHeader = ({ previewScale, setPreviewScale, togglePreviewPanel }: PreviewHeaderProps) => {
  return (
    <Flex
      align="center"
      justify="between"
      style={{
        padding: '8px 16px',
        borderBottom: '1px solid var(--gray-4)',
        backgroundColor: 'var(--gray-3)',
        zIndex: '20',
      }}
    >
      <Text>Preview</Text>
      <Flex align="center" gap="4" justify="center">
        <ResponsiveDropdown<PreviewScaleType>
          showTriggerIcon
          hasValue={previewScale ? 'true' : 'false'}
          menuItems={previewScaleOptions}
          textTransform="lowercase"
          triggerContent={previewScale ?? '-'}
          onChange={setPreviewScale}
        />
        <IconButton color="gray" size="1" variant="ghost" onClick={() => togglePreviewPanel('hide')}>
          <IconX size="16" />
        </IconButton>
      </Flex>
    </Flex>
  );
};
