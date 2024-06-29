import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { Box, DropdownMenu } from '@radix-ui/themes';

import styles from '@/lib/styles/ui.module.css';

interface ResponsiveDropdownProps<T> {
  triggerContent: ReactNode;
  menuItems: T[];
  hasValue: 'true' | 'false';
  onChange?: (selectedItem: T) => void;
}

const ResponsiveDropdown = <T extends string>({
  triggerContent,
  menuItems,
  onChange,
  hasValue,
}: ResponsiveDropdownProps<T>) => {
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
        <Box ref={triggerRef} className={styles.responseDropdownTriggerContainer} data-hasValue={hasValue}>
          {triggerContent}
        </Box>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color="gray" style={{ width: contentWidth, marginRight: '-10px' }}>
        {menuItems.map((item) => (
          <DropdownMenu.Item key={item} style={{ textTransform: 'capitalize' }} onSelect={() => onChange?.(item)}>
            {item}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ResponsiveDropdown;
