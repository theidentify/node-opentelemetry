import type { UserRepository } from '../../types/repositories/user';
import type { UserService } from '../../types/services/user';

export const create = (
  userRepository: UserRepository
): UserService['create'] => {
  return (data) => {
    return userRepository.create(data);
  };
};
