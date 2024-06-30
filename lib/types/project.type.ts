import { z } from 'zod';

import { unitSchema } from '../framework';

export type ProjectConfig = {
  defaultUnit: z.infer<typeof unitSchema>;
};
