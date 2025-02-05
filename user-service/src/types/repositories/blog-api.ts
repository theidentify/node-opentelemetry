import * as Schema from '../../schema';

type BlogSchema = Schema.BlogSchema.Schema;

export type BlogApiClient = {
  findMany: () => Promise<{ success: boolean; data: BlogSchema[] }>;
  findManyByUserId: (
    id: Schema.Branded.UserId
  ) => Promise<{ success: boolean; data: BlogSchema[] }>;
};
