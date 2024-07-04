import { useRef, useState } from 'react';
import { TextField } from '@radix-ui/themes';

import { createPage } from '@/libs/actions/page';
import { useOnClickOutside } from '@/libs/hooks';

type CreatePageType = {
  projectId: string;
  onReset: () => void;
  isCreateEnable: boolean;
};

export const CreatePage = ({ isCreateEnable, onReset, projectId }: CreatePageType) => {
  const [newPageName, setNewPageName] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setNewPageName('');
    onReset();
  };

  useOnClickOutside([inputRef], reset);

  if (!isCreateEnable) {
    return null;
  }

  return (
    <TextField.Root
      ref={inputRef}
      autoFocus
      name="page-name"
      placeholder="Page Name"
      type="text"
      value={newPageName}
      onChange={(e) => setNewPageName(e.target.value)}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          await createPage(newPageName, projectId);
          setNewPageName('');
          onReset();
        }
      }}
    />
  );
};
