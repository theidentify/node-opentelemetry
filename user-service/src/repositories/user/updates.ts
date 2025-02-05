import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../types/repositories/user';
import { Helpers, UserSchema } from '../../schema';

export const update = (
  prismaClient: PrismaClient
): UserRepository['update'] => {
  return async (id, data) => {
    const user = await prismaClient.user.update({
      where: { id },
      data,
    });
    const result = Helpers.fromObjectToSchema(UserSchema.Schema)(user);
    return result.success ? result.data : null;
  };
};
