import { PrismaClient } from '@prisma/client';
import type { UserRepository } from '../../types/repositories/user';
import { Helpers, UserSchema } from '../../schema';

export const create = (
  prismaClient: PrismaClient
): UserRepository['create'] => {
  return async (data) => {
    try {
      const newUser = await prismaClient.user.create({ data });
      const parseUser = Helpers.fromObjectToSchema(UserSchema.Schema)(newUser);
      return parseUser.success ? parseUser.data : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};
