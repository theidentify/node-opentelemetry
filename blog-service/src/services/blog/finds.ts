import { BlogRepository } from '../../types/repositories/blog';
import { BlogService } from '../../types/services/blog';

export const findMany = (
  blogRegistry: BlogRepository
): BlogService['findMany'] => {
  return () => {
    return blogRegistry.findMany();
  };
};

export const findById = (
  blogRegistry: BlogRepository
): BlogService['findById'] => {
  return (id) => {
    return blogRegistry.findById(id);
  };
};

export const findManyByUserId = (
  blogRepository: BlogRepository
): BlogService['findManyByUserId'] => {
  return (userId) => {
    return blogRepository.findManyByUserId(userId);
  };
};
