import { BlogRepository } from '../../types/repositories/blog';
import { BlogService } from '../../types/services/blog';

export const update = (
  blogRepository: BlogRepository
): BlogService['update'] => {
  return (id, data) => {
    return blogRepository.update(id, data);
  };
};
