import { z } from 'zod';

export const unitSchema = z.enum(['px', 'em', 'rem', '%', 'auto', 'inherit', 'initial', 'unset']);

export const stringWithUnitSchema = z.object({
  value: z.string(),
  unit: unitSchema,
});

export const styleSettingSchema = z.object({
  position: z.enum(['absolute', 'relative', 'fixed', 'sticky', 'static']).optional(),
  backgroundColor: z.string().optional(),
  color: z.string().optional(),
  fontSize: stringWithUnitSchema.optional(),
  fontWeight: z.string().optional(),
  textAlign: z.enum(['left', 'center', 'right']).optional(),
  width: stringWithUnitSchema.optional(),
  height: stringWithUnitSchema.optional(),

  // Layout-Specific Properties (if applicable)
  display: z.enum(['flex', 'grid', 'block']).optional(),
  flexDirection: z.enum(['row', 'column', 'row-reverse', 'column-reverse']).optional(),
  justifyContent: z
    .enum(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'])
    .optional(),
  alignItems: z.enum(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']).optional(),

  // Additional CSS Properties (customize as needed)
  margin: stringWithUnitSchema.optional(),
  padding: stringWithUnitSchema.optional(),
  border: stringWithUnitSchema.optional(),
});
