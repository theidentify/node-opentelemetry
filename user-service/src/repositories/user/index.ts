import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../types/repositories/user';
import * as Creates from './creates';
import * as Updates from './updates';
import * as Finds from './finds';
import * as Removes from './removes';
import { BlogApiClient } from '../../types/repositories/blog-api';

export const setupUserRepository = (
  prismaClient: PrismaClient,
  blogApi: BlogApiClient
): UserRepository => {
  return {
    create: Creates.create(prismaClient),
    update: Updates.update(prismaClient),
    findById: Finds.findById(prismaClient),
    findByIdWithRelations: Finds.findByIdWithRelations(prismaClient, blogApi),
    findMany: Finds.findMany(prismaClient),
    findManyWithRelations: Finds.findManyWithRelations(prismaClient, blogApi),
    remove: Removes.remove(prismaClient),
  };
};
