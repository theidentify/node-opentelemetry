import type { UserService } from '../../types/services/user';
import type { UserRepository } from '../../types/repositories/user';
import * as Creates from './creates';
import * as Finds from './finds';
import * as Updates from './updates';
import * as Removes from './removes';

export const setupUserService = (
  userRepository: UserRepository
): UserService => ({
  create: Creates.create(userRepository),
  findById: Finds.findById(userRepository),
  findByIdWithRelations: Finds.findByIdWithRelations(userRepository),
  findMany: Finds.findMany(userRepository),
  findManyWithRelations: Finds.findManyWithRelations(userRepository),
  update: Updates.update(userRepository),
  remove: Removes.remove(userRepository),
});
