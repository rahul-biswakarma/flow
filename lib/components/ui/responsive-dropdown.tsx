import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { ChevronDownIcon, DropdownMenu, Flex } from '@radix-ui/themes';

import styles from '@/lib/styles/ui.module.css';

interface ResponsiveDropdownProps<T> {
  triggerContent: ReactNode;
  menuItems: T[];
  showTriggerIcon?: boolean;
  hasValue: 'true' | 'false';
  onChange?: (selectedItem: T) => void;
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase';
}

const ResponsiveDropdown = <T extends string>({
  triggerContent,
  menuItems,
  onChange,
  showTriggerIcon = false,
  hasValue,
  textTransform = 'capitalize',
}: ResponsiveDropdownProps<T>) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  const [marginRight, setMarginRight] = useState<string>('-10px');
  const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (triggerRef.current) {
      const clientWidth = triggerRef.current.clientWidth;

      if (clientWidth > 200) {
        setContentWidth(clientWidth);
        setMarginRight('-10px');
      } else {
        setContentWidth(200);
        setMarginRight('0');
      }
    }
  }, [triggerRef.current?.clientWidth]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Flex
          ref={triggerRef}
          align="center"
          className={styles.responseDropdownTriggerContainer}
          data-hasValue={hasValue}
          justify="between"
          style={{ textTransform }}
        >
          {triggerContent}
          {showTriggerIcon && <ChevronDownIcon />}
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color="gray" style={{ width: contentWidth, marginRight }}>
        {menuItems.map((item) => (
          <DropdownMenu.Item key={item} style={{ textTransform }} onSelect={() => onChange?.(item)}>
            {item}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ResponsiveDropdown;
