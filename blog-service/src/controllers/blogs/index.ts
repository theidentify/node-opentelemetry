import { Router } from 'express';
import { BlogService } from '../../types/services/blog';
import * as Post from './post';
import * as Get from './get';
import * as Put from './put';
import * as Delete from './delete';

export const setupBlogRoutes = (blogService: BlogService) => {
  const router = Router();

  router.use('/', Get.setGetRoutes(blogService));
  router.use('/', Post.setupPostRoutes(blogService));
  router.use('/', Put.setupPutRoutes(blogService));
  router.use('/', Delete.setupDeleteRoutes(blogService));

  return router;
};

export const docs = [...Post.docs, ...Get.docs, ...Put.docs, ...Delete.docs];
