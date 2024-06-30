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

export const generateConnectionId = (data: NodeHandlerType) => {
  return `connection-${data.nodeId}-${data.handlerType}-${data.handlerKey}`;
};

export function validateConnection(from: NodeHandlerType, to: NodeHandlerType) {
  return false;
}
