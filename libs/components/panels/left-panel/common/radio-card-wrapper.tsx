import React, { ReactNode, FC } from 'react';
import { Flex, RadioCards } from '@radix-ui/themes';

import styles from '../styles/project-config-widget.module.css';

export const RadioCardItemWrapper = ({
  value,
  children,
  icon,
}: {
  value: string;
  children: ReactNode;
  icon?: FC<any>;
}) => {
  const IconComponent = icon;

  return (
    <RadioCards.Item className={styles.radioCardItemWrapper} value={value}>
      <Flex align="center" className={styles.radioCardItem} gap="2" justify="center" width="100%">
        {IconComponent && <IconComponent size="16px" />}
        {children}
      </Flex>
    </RadioCards.Item>
  );
};
