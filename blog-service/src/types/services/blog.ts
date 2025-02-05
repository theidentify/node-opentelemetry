import { Branded, BlogSchema } from '../../schema';
import * as Errors from '../errors/blog-errors';

type BlogSchema = BlogSchema.Schema;

export type BlogService = {
  create: (
    data: BlogSchema.CreateSchema
  ) => Promise<BlogSchema | Errors.CreateBlogError>;
  update: (
    id: Branded.BlogId,
    data: BlogSchema.UpdateSchema
  ) => Promise<BlogSchema | Errors.UpdateBlogError>;
  findMany: () => Promise<BlogSchema[] | Errors.FindManyBlogError>;
  findById: (id: Branded.BlogId) => Promise<BlogSchema | Errors.FindBlogError>;
  findManyByUserId: (
    id: Branded.UserId
  ) => Promise<BlogSchema[] | Errors.FindManyBlogError>;
  remove: (id: Branded.BlogId) => Promise<BlogSchema | Errors.RemoveBlogError>;
};
