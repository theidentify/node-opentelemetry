import { z } from 'zod';
import * as Branded from './branded';
import * as GeneralSchema from './general';

export const Schema = z.object({
  id: Branded.UserId,
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  ...GeneralSchema.TimeStampSchema.shape,
});
export type Schema = z.infer<typeof Schema>;

export const SchemaArray = Schema.array();
export type SchemaArray = z.infer<typeof SchemaArray>;

