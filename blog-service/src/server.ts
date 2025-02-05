import express, { type Express } from 'express';
import * as Controllers from './controllers';
import { setupOpenApi } from './configures/openapi/setup-openapi';
import { setupScalarDocs } from './configures/openapi/setup-scalar-docs';
import { BlogRepository } from './types/repositories/blog';
import { setupBlogRepository } from './repositories/blog';
import prismaClient from './repositories/prisma';
import { BlogService } from './types/services/blog';
import { setupBlogService } from './services/blog';
import userApiClient from './repositories/user-api';

const PORT = process.env.PORT || 3001;
const app: Express = express();

app.use(express.json());

app.use('/openapi.json', setupOpenApi(Controllers.apiDocs));

app.use('/docs', setupScalarDocs());

app.use('/health', Controllers.Healths.setupHealthRoutes());

const blogRepository: BlogRepository = setupBlogRepository(
  prismaClient,
  userApiClient
);
const blogService: BlogService = setupBlogService(blogRepository);
app.use('/blogs', Controllers.Blogs.setupBlogRoutes(blogService));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
