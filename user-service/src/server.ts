import express, { type Express } from 'express';
import * as Controllers from './controllers';
import { setupOpenApi } from './configures/openapi/setup-openapi';
import { setupScalarDocs } from './configures/openapi/setup-scalar-docs';
import { UserRepository } from './types/repositories/user';
import { setupUserRepository } from './repositories/user';
import prismaClient from './repositories/prisma';
import { UserService } from './types/services/user';
import { setupUserService } from './services/user';
import blogApi from './repositories/blog-api';

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());

app.use('/openapi.json', setupOpenApi(Controllers.apiDocs));

app.use('/docs', setupScalarDocs());

app.use('/health', Controllers.Healths.setupHealthRoutes());

const userRepository: UserRepository = setupUserRepository(
  prismaClient,
  blogApi
);
const userService: UserService = setupUserService(userRepository);
app.use('/users', Controllers.Users.setupUserRoutes(userService));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
