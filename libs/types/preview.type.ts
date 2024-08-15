import { Button, Box, Text } from '@radix-ui/themes';

import { WebNodeTypes } from './node.type';

export type PreviewScaleType = '25%' | '50%' | '75%' | '100%' | '125%' | '150%' | '200%' | '300%' | '400%' | '500%';

export const WebNodeToPreview = (type: WebNodeTypes) => {
  switch (type) {
    case WebNodeTypes.Main:
      return Box;
    case WebNodeTypes.Text:
      return Text;
    case WebNodeTypes.Button:
      return Button;
    case WebNodeTypes.Container:
      return Box;
    default:
      return null;
  }
};
