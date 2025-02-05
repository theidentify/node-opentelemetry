import { z } from 'zod';

export const TimeStampSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});
