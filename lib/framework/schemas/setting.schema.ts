import { z } from 'zod';

export const styleSettingSchema = z.object({
  position: z.enum(['absolute', 'relative', 'fixed', 'sticky', 'static']).optional(),
  backgroundColor: z.string().optional(),
  color: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z.string().optional(),
  textAlign: z.enum(['left', 'center', 'right']).optional(),
  width: z.string().optional(),
  height: z.string().optional(),

  // Layout-Specific Properties (if applicable)
  display: z.enum(['flex', 'grid', 'block']).optional(),
  flexDirection: z.enum(['row', 'column', 'row-reverse', 'column-reverse']).optional(),
  justifyContent: z
    .enum(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'])
    .optional(),
  alignItems: z.enum(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']).optional(),

  // Additional CSS Properties (customize as needed)
  margin: z.string().optional(),
  padding: z.string().optional(),
  border: z.string().optional(),
});

export const NodeSettingType = z.object({
  style: styleSettingSchema,
});

export const SettingsTypes = {
  style: styleSettingSchema,
};
