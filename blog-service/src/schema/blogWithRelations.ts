import { z } from 'zod';
import * as UserSchema from './user';
import * as BlogSchema from './blog';

export const Schema = z.object({
  ...BlogSchema.Schema.shape,
  user: UserSchema.Schema,
});
export type Schema = z.infer<typeof Schema>;

export const SchemaArray = Schema.array();
export type SchemaArray = z.infer<typeof SchemaArray>;
