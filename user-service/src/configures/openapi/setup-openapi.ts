import { Router } from 'express';
import _ from 'lodash';
import { createDocument, ZodOpenApiPathsObject } from 'zod-openapi';

export const setupOpenApi = (paths: ZodOpenApiPathsObject[] = []) => {
  const router = Router();
  const document = createDocument({
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '0.0.1',
      description: 'API for the application',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local Server' }],
    paths: _.reduce(paths, (acc, path) => _.merge(acc, path)),
  });

  router.get('/', (req, res) => {
    res.status(200).json(document);
  });

  return router;
};
