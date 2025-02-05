import type { BlogService } from '../../types/services/blog';
import type { BlogRepository } from '../../types/repositories/blog';
import * as Creates from './creates';
import * as Finds from './finds';
import * as Updates from './updates';
import * as Removes from './removes';

export const setupBlogService = (repository: BlogRepository): BlogService => ({
  create: Creates.create(repository),
  findById: Finds.findById(repository),
  findMany: Finds.findMany(repository),
  findManyByUserId: Finds.findManyByUserId(repository),
  update: Updates.update(repository),
  remove: Removes.remove(repository),
});
