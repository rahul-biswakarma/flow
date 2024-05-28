'use client';

import { IconPlus } from '@tabler/icons-react';
import { Page } from '@prisma/client';
import { useRef, useState } from 'react';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

import { IconSize, IconStrokeWidth } from '@/lib/constants/ui';
import { useOnClickOutside } from '@/lib/hooks';

interface PagesContainerProps {
  pages: Page[];
}

export const PagesContainer = ({ pages }: PagesContainerProps) => {
  const [newPageName, setNewPageName] = useState<string>('');
  const [enableCreatePage, setEnableCreatePage] = useState(false);

  const onTriggered = () => {
    setEnableCreatePage(false);
    setNewPageName('');
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside([inputRef, buttonRef], onTriggered);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <span>Pages</span>
        <Button
          ref={buttonRef}
          aria-label="Add new page"
          size="icon"
          variant="ghost"
          onClick={() => setEnableCreatePage(true)}
        >
          <IconPlus size={IconSize.MD} strokeWidth={IconStrokeWidth} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {pages?.map((page) => <div key={page.id}>{page.name}</div>)}
        {enableCreatePage && (
          <Input
            ref={inputRef}
            autoFocus
            placeholder="Page Name"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Create new page
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
