import { z } from 'zod';

export const ErrorSchema = (msg?: string) => {
  return z.object({
    code: z.string(),
    message: z.string().or(z.literal(msg)),
    details: z.optional(z.record(z.any())),
  });
};
