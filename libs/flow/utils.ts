import { NodeHandlerType } from './types';

export const generateHandlerId = (data: NodeHandlerType) => {
  return `flow-handler-${data.nodeId}-${data.handlerType}-${data.handlerKey}`;
};

export const generateEdgeId = (data: NodeHandlerType) => {
  return `flow-edge-${data.nodeId}-${data.handlerType}-${data.handlerKey}`;
};

export const getHandlerElement = (data: NodeHandlerType) => {
  return document.querySelector(`[data-handler-id="${generateHandlerId(data)}"]`);
};

export function validateConnection(from: NodeHandlerType, to: NodeHandlerType) {
  if (from.nodeId === to.nodeId) return false;
  if (from.handlerType === to.handlerType) return false;
  if (
    (from.handlerType === 'visual-source' && to.handlerType === 'action-target') ||
    (from.handlerType === 'visual-target' && to.handlerType === 'action-source') ||
    (from.handlerType === 'action-source' && to.handlerType === 'visual-target') ||
    (from.handlerType === 'action-target' && to.handlerType === 'visual-source')
  )
    return false;

  return true;
}
