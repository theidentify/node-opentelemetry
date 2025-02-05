import { Branded } from '../schema';
import { BlogApiClient } from '../types/repositories/blog-api';

const BLOG_BASEURL = 'http://localhost:3001/blogs';

const blogApi: BlogApiClient = {
  findManyByUserId: async (id: Branded.UserId) => {
    return fetch(`${BLOG_BASEURL}/users/${id}`).then((res) => res.json());
  },
  findMany: async () => {
    return fetch(`${BLOG_BASEURL}`).then((res) => res.json());
  },
};

export default blogApi;
