import { Button, Box, Text } from '@radix-ui/themes';

export type PreviewScaleType = '25%' | '50%' | '75%' | '100%' | '125%' | '150%' | '200%' | '300%' | '400%' | '500%';

export const WebNodeToPreview = (type: string) => {
  switch (type) {
    case 'system-main-node':
      return Box;
    case 'system-text-node':
      return Text;
    case 'system-button-node':
      return Button;
    case 'system-container-node':
      return Box;
    default:
      return null;
  }
};
