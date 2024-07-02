import { StringRenderer } from './option-renderer';

import { webNodeAttribute } from '@/lib/framework/types';

type AttributeFieldType = {
  webNodeType: string;
  getAttributeValue: (attrName: string) => any;
  updateAttributeConfig: (attrName: string, value: any) => void;
};

export const AttributeFields = ({ webNodeType, getAttributeValue, updateAttributeConfig }: AttributeFieldType) => {
  return webNodeAttribute[webNodeType].map((attribute) => {
    switch (attribute.type) {
      case 'string':
        return (
          <StringRenderer
            label={attribute.label}
            value={getAttributeValue(attribute.name)}
            onChange={(value) => updateAttributeConfig(attribute.name, value)}
          />
        );
    }
  });
};
