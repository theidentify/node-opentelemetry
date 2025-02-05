import { PrismaClient } from '@prisma/client';
import { BlogRepository } from '../../types/repositories/blog';
import * as Creates from './creates';
import * as Updates from './updates';
import * as Finds from './finds';
import * as Removes from './removes';
import { UserApiClient } from '../../types/repositories/user-api';

export const setupBlogRepository = (
  prismaClient: PrismaClient,
  userApiClient: UserApiClient
): BlogRepository => {
  return {
    create: Creates.create(prismaClient),
    update: Updates.update(prismaClient),
    findById: Finds.findById(prismaClient),
    findByIdWithRelations: Finds.findByIdWithRelations(
      prismaClient,
      userApiClient
    ),
    findMany: Finds.findMany(prismaClient),
    findManyByUserId: Finds.findManyByUserId(prismaClient),
    findManyWithRelations: Finds.findManyWithRelations(
      prismaClient,
      userApiClient
    ),
    remove: Removes.remove(prismaClient),
  };
};
