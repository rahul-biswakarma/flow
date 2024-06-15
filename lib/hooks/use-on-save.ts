'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useProjectContext } from '../context';
import { updatePageData } from '../actions/page';

export const useOnSave = () => {
  const { nodes, edges, currentPageId } = useProjectContext();
  const stringifiedData = JSON.stringify({ nodes, edges });

  const saveData = useCallback(async () => {
    try {
      toast('Saving...');
      await updatePageData(currentPageId, stringifiedData);
      toast('Saved successfully!');
    } catch (error) {
      toast('Failed to save data');
    }
  }, [stringifiedData, currentPageId]);

  return saveData;
};
