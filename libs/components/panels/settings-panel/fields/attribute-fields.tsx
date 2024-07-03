import { Flex, Text } from '@radix-ui/themes';

import { StringRenderer } from '../option-renderer';

import { webNodeAttribute } from '@/libs/schemas';

type AttributeFieldType = {
  webNodeType: string;
  getAttributeValue: (attrName: string) => any;
  updateAttributeConfig: (attrName: string, value: any) => void;
};

export const AttributeFields = ({ webNodeType, getAttributeValue, updateAttributeConfig }: AttributeFieldType) => {
  return (
    webNodeAttribute[webNodeType]?.map((attribute) => {
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
    }) ?? (
      <Flex
        height="50px"
        justify="center"
        style={{
          color: 'var(--gray-8)',
        }}
      >
        <Text>nothing to show</Text>
      </Flex>
    )
  );
};
