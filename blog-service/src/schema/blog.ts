import { z } from 'zod';
import * as Branded from './branded';
import * as GeneralSchema from './general';

export const Schema = z.object({
  id: Branded.BlogId,
  title: z.string(),
  content: z.string(),
  userId: Branded.UserId,
  ...GeneralSchema.TimeStampSchema.shape,
});
export type Schema = z.infer<typeof Schema>;

export const SchemaArray = Schema.array();
export type SchemaArray = z.infer<typeof SchemaArray>;

export const CreateSchema = Schema.pick({
  title: true,
  content: true,
  userId: true,
});
export type CreateSchema = z.infer<typeof CreateSchema>;

export const UpdateSchema = Schema.pick({
  title: true,
  content: true,
  userId: true,
});
export type UpdateSchema = z.infer<typeof UpdateSchema>;
