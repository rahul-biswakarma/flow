import { ZodEnum, ZodOptional, ZodSchema, z } from 'zod';

import { NodeHandlerType } from '../types';

export function extractSchemaInfo(schema: ZodSchema<any>) {
  if (schema instanceof ZodOptional) {
    schema = schema._def.innerType;
  }

  if (schema instanceof ZodEnum) {
    return { type: 'enum', options: schema._def.values };
  }

  if (schema instanceof z.ZodString) {
    return { type: 'string' };
  }

  // Add other type checks as needed
  return { type: 'unknown' };
}

export const generateHandlerId = (data: NodeHandlerType) => {
  return `handler-${data.nodeId}-${data.handlerType}-${data.handlerKey}`;
};

export const generateEdgeId = (data: NodeHandlerType) => {
  return `connection-${data.nodeId}-${data.handlerType}-${data.handlerKey}`;
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
