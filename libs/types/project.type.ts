import { z } from 'zod';

import { unitSchema } from '../flow';

export type ProjectConfig = {
  defaultUnit: z.infer<typeof unitSchema>;
};
