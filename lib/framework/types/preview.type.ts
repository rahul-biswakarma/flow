import { Button, Box, Text } from '@radix-ui/themes';

export const WebNodeToPreview = (type: string) => {
  switch (type) {
    case 'system-body-node':
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
