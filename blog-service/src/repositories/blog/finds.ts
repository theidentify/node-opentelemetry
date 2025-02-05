import { PrismaClient } from '@prisma/client';
import { BlogRepository } from '../../types/repositories/blog';
import {
  Helpers,
  BlogSchema,
  BlogWithRelationsSchema,
  Branded,
} from '../../schema';
import { UserApiClient } from '../../types/repositories/user-api';

export const findMany = (
  prismaClient: PrismaClient
): BlogRepository['findMany'] => {
  return async () => {
    const blogs = await prismaClient.blog.findMany();
    const results = Helpers.fromObjectToSchema(BlogSchema.SchemaArray)(blogs);
    return results.success ? results.data : [];
  };
};

export const findById = (
  prismaClient: PrismaClient
): BlogRepository['findById'] => {
  return async (id) => {
    const blog = await prismaClient.blog.findUnique({ where: { id } });
    const result = Helpers.fromObjectToSchema(BlogSchema.Schema)(blog);
    return result.success ? result.data : null;
  };
};

export const findManyByUserId = (
  prismaClient: PrismaClient
): BlogRepository['findManyByUserId'] => {
  return async (id) => {
    const blogs = await prismaClient.blog.findMany({ where: { userId: id } });
    const result = Helpers.fromObjectToSchema(BlogSchema.SchemaArray)(blogs);
    return result.success ? result.data : [];
  };
};

export const findManyWithRelations = (
  prismaClient: PrismaClient,
  userApi: UserApiClient
): BlogRepository['findManyWithRelations'] => {
  return async () => {
    const blogs = await prismaClient.blog.findMany();
    const users = await userApi.findMany();
    const results = Helpers.fromObjectToSchema(
      BlogWithRelationsSchema.SchemaArray
    )(
      blogs.map((blog) => ({
        ...blog,
        user: users.success
          ? users.data.find((user) => user.id === blog.userId)
          : undefined,
      }))
    );
    return results.success ? results.data : [];
  };
};

export const findByIdWithRelations = (
  prismaClient: PrismaClient,
  userApi: UserApiClient
): BlogRepository['findByIdWithRelations'] => {
  return async (id) => {
    let blog = await prismaClient.blog.findUnique({
      where: { id },
    });

    const userId = Branded.UserId.parse(blog?.userId);
    const user = await userApi.findById(userId);

    const result = Helpers.fromObjectToSchema(BlogWithRelationsSchema.Schema)({
      ...blog,
      user,
    });
    return result.success ? result.data : null;
  };
};
