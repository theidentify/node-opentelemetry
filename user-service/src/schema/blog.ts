import { z } from 'zod';
import * as Branded from './branded';

export const Schema = z.object({
  id: Branded.BlogId,
  title: z.string(),
  content: z.string(),
  userId: Branded.UserId,
});
export type Schema = z.infer<typeof Schema>;

export const SchemaArray = Schema.array();
export type SchemaArray = z.infer<typeof SchemaArray>;
