'use client';

import { IconPlus } from '@tabler/icons-react';
import { Button } from '@nextui-org/button';
import { Page } from '@prisma/client';
import { useState } from 'react';
import { Input } from '@nextui-org/input';

import { IconSize, IconStrokeWidth } from '@/lib/constants/ui';
import { useClickOutside } from '@/lib/hooks';

interface PagesContainerProps {
  pages: Page[];
}

export const PagesContainer = ({ pages }: PagesContainerProps) => {
  const [newPageName, setNewPageName] = useState<string>('');
  const [enableCreatePage, setEnableCreatePage] = useState(false);

  const newPageInputRef = useClickOutside<HTMLInputElement>({
    onTriggered: () => {
      setEnableCreatePage(false);
      setNewPageName('');
    },
  });

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <span>Pages</span>
        <Button
          isIconOnly
          aria-label="Add new page"
          size="sm"
          variant="light"
          onClick={() => setEnableCreatePage(true)}
        >
          <IconPlus size={IconSize.MD} strokeWidth={IconStrokeWidth} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {pages?.map((page) => <div key={page.id}>{page.name}</div>)}
        {enableCreatePage && (
          <Input
            ref={newPageInputRef}
            autoFocus
            placeholder="Page Name"
            radius="sm"
            size="sm"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};
