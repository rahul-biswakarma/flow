import { ZodEnum, ZodOptional, ZodSchema, z } from 'zod';

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
