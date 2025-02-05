import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../types/repositories/user';
import { Helpers, UserSchema } from '../../schema';

export const remove = (
  prismaClient: PrismaClient
): UserRepository['remove'] => {
  return async (id) => {
    const user = await prismaClient.user.delete({ where: { id } });
    const result = Helpers.fromObjectToSchema(UserSchema.Schema)(user);
    return result.success ? result.data : null;
  };
};
