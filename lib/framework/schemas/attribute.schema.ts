import { z } from 'zod';

export const unitSchema = z.enum(['px', 'em', 'rem', '%', 'auto', 'inherit', 'initial', 'unset']);

export const textAttributeSchema = z.object({
  children: z.string(),
});
