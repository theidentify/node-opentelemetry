import type { BlogRepository } from '../../types/repositories/blog';
import type { BlogService } from '../../types/services/blog';

export const create = (repository: BlogRepository): BlogService['create'] => {
  return (data) => {
    return repository.create(data);
  };
};
