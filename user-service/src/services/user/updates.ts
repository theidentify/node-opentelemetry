import { UserRepository } from '../../types/repositories/user';
import { UserService } from '../../types/services/user';

export const update = (
  userRepository: UserRepository
): UserService['update'] => {
  return (id, data) => {
    return userRepository.update(id, data);
  };
};
