'use client';

import { useCallback } from 'react';

import { useProjectContext } from '../context';
import { updatePageData } from '../actions/page';

export const useOnSave = () => {
  const { nodes, edges, currentPageId } = useProjectContext();
  const stringifiedData = JSON.stringify({ nodes, edges });

  const saveData = useCallback(async () => {
    try {
      await updatePageData(currentPageId, stringifiedData);
    } catch (error) {
      // toast('Failed to save data');
    }
  }, [stringifiedData, currentPageId]);

  return saveData;
};
