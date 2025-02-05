import { PrismaClient } from '@prisma/client';
import { BlogRepository } from '../../types/repositories/blog';
import { Helpers, BlogSchema } from '../../schema';

export const update = (
  prismaClient: PrismaClient
): BlogRepository['update'] => {
  return async (id, data) => {
    const blog = await prismaClient.blog.update({
      where: { id },
      data,
    });
    const result = Helpers.fromObjectToSchema(BlogSchema.Schema)(blog);
    return result.success ? result.data : null;
  };
};
