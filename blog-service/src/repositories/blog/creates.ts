import { PrismaClient } from '@prisma/client';
import type { BlogRepository } from '../../types/repositories/blog';
import { Helpers, BlogSchema } from '../../schema';

export const create = (
  prismaClient: PrismaClient
): BlogRepository['create'] => {
  return async (data) => {
    const newUser = await prismaClient.blog.create({ data });
    const parseBlog = Helpers.fromObjectToSchema(BlogSchema.Schema)(newUser);
    return parseBlog.success ? parseBlog.data : null;
  };
};
