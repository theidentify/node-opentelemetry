import { z } from 'zod';

export const UserId = z.number().brand('UserId');
export type UserId = z.infer<typeof UserId>;

export const UserIdFromString = (userId: string): UserId =>
  UserId.parse(+userId);

export const BlogId = z.number().brand('BlogId');
export type BlogId = z.infer<typeof BlogId>;

export const BlogIdFromString = (blogId: string): BlogId =>
  BlogId.parse(+blogId);
