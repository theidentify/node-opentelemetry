import { UserRepository } from '../../types/repositories/user';
import { UserService } from '../../types/services/user';

export const remove = (
  userRepository: UserRepository
): UserService['remove'] => {
  return (id) => {
    return userRepository.remove(id);
  };
};
