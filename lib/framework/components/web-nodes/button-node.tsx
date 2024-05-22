import { z } from 'zod';

import { button_node } from '@/schemas/web.schema';

type ButtonNodeType = z.infer<typeof button_node>;

export const ButtonNodeWireFrame = ({ label, style, onClick }: ButtonNodeType['properties']) => {
  return <button style={style}>{label}</button>;
};
