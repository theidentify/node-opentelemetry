import { Router } from 'express';
import { UserService } from '../../types/services/user';
import * as Post from './post';
import * as Get from './get';
import * as Put from './put';
import * as Delete from './delete';

export const setupUserRoutes = (userService: UserService) => {
  const router = Router();

  router.use('/', Get.setupGetRoutes(userService));
  router.use('/', Post.setupPostRoutes(userService));
  router.use('/', Put.setupPutRoutes(userService));
  router.use('/', Delete.setupDeleteRoutes(userService));

  return router;
};

export const docs = [...Post.docs, ...Get.docs, ...Put.docs, ...Delete.docs];
