import { UserRepository } from '../../types/repositories/user';
import { UserService } from '../../types/services/user';

export const findMany = (
  userRepository: UserRepository
): UserService['findMany'] => {
  return () => {
    return userRepository.findMany();
  };
};

export const findById = (
  userRepository: UserRepository
): UserService['findById'] => {
  return (id) => {
    return userRepository.findById(id);
  };
};

export const findByIdWithRelations = (
  userRepository: UserRepository
): UserService['findByIdWithRelations'] => {
  return (id) => {
    return userRepository.findByIdWithRelations(id);
  };
};

export const findManyWithRelations = (userRepository: UserRepository) => {
  return () => {
    return userRepository.findManyWithRelations();
  };
};
