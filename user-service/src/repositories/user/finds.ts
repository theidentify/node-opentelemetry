import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../types/repositories/user';
import { Helpers, UserSchema, UserWithRelationsSchema } from '../../schema';
import { BlogApiClient } from '../../types/repositories/blog-api';

export const findMany = (
  prismaClient: PrismaClient
): UserRepository['findMany'] => {
  return async () => {
    const users = await prismaClient.user.findMany();
    const results = Helpers.fromObjectToSchema(UserSchema.SchemaArray)(users);
    return results.success ? results.data : [];
  };
};

export const findById = (
  prismaClient: PrismaClient
): UserRepository['findById'] => {
  return async (id) => {
    const user = await prismaClient.user.findUnique({ where: { id } });
    const result = Helpers.fromObjectToSchema(UserSchema.Schema)(user);
    return result.success ? result.data : null;
  };
};

export const findManyWithRelations = (
  prismaClient: PrismaClient,
  blogApi: BlogApiClient
): UserRepository['findManyWithRelations'] => {
  return async () => {
    const users = await prismaClient.user.findMany();
    const blogs = await blogApi.findMany();
    const results = Helpers.fromObjectToSchema(
      UserWithRelationsSchema.SchemaArray
    )(
      users.map((user) => ({
        ...user,
        blog: blogs.success
          ? blogs.data.filter((blog) => blog.userId === user.id)
          : [],
      }))
    );

    return results.success ? results.data : [];
  };
};

export const findByIdWithRelations = (
  prismaClient: PrismaClient,
  blogApi: BlogApiClient
): UserRepository['findByIdWithRelations'] => {
  return async (id) => {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    const blogs = await blogApi.findManyByUserId(id);
    const result = Helpers.fromObjectToSchema(UserWithRelationsSchema.Schema)({
      ...user,
      blog: blogs.success ? blogs.data : [],
    });
    return result.success ? result.data : null;
  };
};
