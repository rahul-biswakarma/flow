import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { Box, DropdownMenu } from '@radix-ui/themes';

import styles from '@/lib/styles/ui.module.css';

interface ResponsiveDropdownProps {
  triggerContent: ReactNode;
  menuItems: string[];
}

const ResponsiveDropdown: React.FC<ResponsiveDropdownProps> = ({ triggerContent, menuItems }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (triggerRef.current) {
      setContentWidth(triggerRef.current.clientWidth);
    }
  }, [triggerRef.current?.clientWidth]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Box ref={triggerRef} className={styles.responseDropdownTriggerContainer}>
          {triggerContent}
        </Box>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={{ width: contentWidth, marginRight: '-10px' }}>
        {menuItems.map((item) => (
          <DropdownMenu.Item key={item} style={{ textTransform: 'capitalize' }}>
            {item}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ResponsiveDropdown;
