import { apiReference } from '@scalar/express-api-reference';
import { Router } from 'express';

export const setupScalarDocs = () => {
  const router = Router();
  router.get(
    '/',
    apiReference({
      darkMode: true,
      layout: 'modern',
      
      spec: {
        url: '/openapi.json',
      },
      theme: 'deepSpace',
    })
  );
  return router;
};
