import { z } from 'zod';

export const fromObjectToSchema =
  <TSchema extends z.ZodSchema>(schema: TSchema) =>
  <T>(data: T): z.SafeParseReturnType<T, z.infer<TSchema>> =>
    schema.safeParse(data);
