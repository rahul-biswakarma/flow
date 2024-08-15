import { IconBox } from '@tabler/icons-react';

import { WebNodeTypesType } from '@/libs/flow';

export const NodeIconRenderer = ({ nodeSchema }: { nodeSchema?: WebNodeTypesType }) => {
  const IconComponent = nodeSchema?.icon ?? IconBox;

  return <IconComponent size="18px" stroke={1.25} />;
};
