import { BlogRepository } from '../../types/repositories/blog';
import { BlogService } from '../../types/services/blog';

export const remove = (
  blogRepository: BlogRepository
): BlogService['remove'] => {
  return (id) => {
    return blogRepository.remove(id);
  };
};
