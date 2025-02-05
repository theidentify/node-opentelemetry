import * as Schema from '../../schema';
import * as Errors from '../errors/blog-errors';

type BlogSchema = Schema.BlogSchema.Schema;

export type BlogRepository = {
  create: (
    data: Schema.BlogSchema.CreateSchema
  ) => Promise<BlogSchema | Errors.CreateBlogError>;
  findMany: () => Promise<BlogSchema[]>;
  findById: (
    id: Schema.Branded.BlogId
  ) => Promise<BlogSchema | Errors.FindBlogError>;
  findManyByUserId: (id: Schema.Branded.UserId) => Promise<BlogSchema[]>;
  findManyWithRelations: () => Promise<Schema.BlogWithRelationsSchema.SchemaArray>;
  findByIdWithRelations: (
    id: Schema.Branded.BlogId
  ) => Promise<Schema.BlogWithRelationsSchema.Schema | Errors.FindBlogError>;
  update: (
    id: Schema.Branded.BlogId,
    data: Schema.BlogSchema.UpdateSchema
  ) => Promise<BlogSchema | Errors.UpdateBlogError>;
  remove: (
    id: Schema.Branded.BlogId
  ) => Promise<BlogSchema | Errors.RemoveBlogError>;
};
