'use client';

import { useCallback } from 'react';

import { updatePageData } from '../actions/page';
import { useFlowContext } from '../flow';
import { useProjectContext } from '../context';

export const useOnSave = () => {
  const { currentPageId } = useProjectContext();
  const { nodes, edges } = useFlowContext();
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
