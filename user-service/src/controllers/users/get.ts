import { Router } from 'express';
import { UserService } from '../../types/services/user';
import { describeRoute } from '../../types/docs.helper';
import {
  BlogSchema,
  Helpers,
  UserSchema,
  UserWithRelationsSchema,
} from '../../schema';
import { UserIdFromString } from '../../schema/branded';

const getUsersResponseSchema = UserSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).array();

const getUsersDoc = describeRoute({
  '/users': {
    get: {
      responses: {
        200: {
          description: 'Get all users',
          content: {
            'application/json': {
              schema: getUsersResponseSchema,
            },
          },
        },
      },
      tags: ['User'],
    },
  },
});

const getUserByIdResponseSchema = UserSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const getUserByIdDoc = describeRoute({
  '/users/:userId': {
    get: {
      responses: {
        200: {
          description: 'Get user by id',
          content: {
            'application/json': {
              schema: getUserByIdResponseSchema,
            },
          },
        },
      },
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'number',
            required: ['true'],
          },
        },
      ],
      tags: ['User'],
    },
  },
});

const getUserWithRelationsResponseSchema = UserWithRelationsSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const getUsersWithRelationsResponseSchema =
  getUserWithRelationsResponseSchema.array();

const getUsersWithRelationsDoc = describeRoute({
  '/users/blogs': {
    get: {
      responses: {
        200: {
          description: 'Get all users with blogs',
          content: {
            'application/json': {
              schema: getUsersWithRelationsResponseSchema,
            },
          },
        },
      },
      tags: ['User'],
    },
  },
});

const getUserWithRelationsByIdDoc = describeRoute({
  '/users/:userId/blogs': {
    get: {
      responses: {
        200: {
          description: 'Get user with blogs by user id',
          content: {
            'application/json': {
              schema: getUserWithRelationsResponseSchema,
            },
          },
        },
      },
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'number',
            required: ['true'],
          },
        },
      ],
      tags: ['User'],
    },
  },
});

export const setupGetRoutes = (userService: UserService) => {
  const app = Router();

  app.get('/', async (req, res) => {
    const users = await userService.findMany();
    const results = Helpers.fromObjectToSchema(getUsersResponseSchema)(users);
    res.json(results);
  });

  app.get('/blogs', async (req, res) => {
    const users = await userService.findManyWithRelations();
    const results = Helpers.fromObjectToSchema(
      getUsersWithRelationsResponseSchema
    )(users);
    res.json(results);
  });

  app.get('/:userId', async (req, res) => {
    const userId = UserIdFromString(req.params.userId);
    const user = await userService.findById(userId);
    const result = Helpers.fromObjectToSchema(getUserByIdResponseSchema)(user);
    res.json(result);
  });

  app.get('/:userId/blogs', async (req, res) => {
    const userId = UserIdFromString(req.params.userId);
    const user = await userService.findByIdWithRelations(userId);
    const result = Helpers.fromObjectToSchema(
      getUserWithRelationsResponseSchema
    )(user);
    res.json(result);
  });

  return app;
};

export const docs = [
  getUsersDoc,
  getUserByIdDoc,
  getUserWithRelationsByIdDoc,
  getUsersWithRelationsDoc,
];
