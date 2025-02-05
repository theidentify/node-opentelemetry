import { PrismaClient } from '@prisma/client';
import { BlogRepository } from '../../types/repositories/blog';
import { Helpers, BlogSchema } from '../../schema';

export const remove = (
  prismaClient: PrismaClient
): BlogRepository['remove'] => {
  return async (id) => {
    const blog = await prismaClient.blog.delete({ where: { id } });
    const result = Helpers.fromObjectToSchema(BlogSchema.Schema)(blog);
    return result.success ? result.data : null;
  };
};
