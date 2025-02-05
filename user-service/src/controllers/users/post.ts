import express from 'express';
import type { UserService } from '../../types/services/user';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { Helpers, UserSchema } from '../../schema';
import { z } from 'zod';

const userCreateResponse = UserSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const ErrorSchema = z.object({
  error: z
    .union([
      z.literal('Create user error'),
      z.record(
        z.enum([
          ...(Object.keys(UserSchema.CreateSchema.shape) as [
            keyof typeof UserSchema.CreateSchema.shape
          ]),
        ]),
        z.string().array()
      ),
    ])
    .describe('Error message or validation errors object'),
});

const userCreateDocs: ZodOpenApiPathsObject = {
  '/users': {
    post: {
      requestBody: {
        content: {
          'application/json': {
            schema: UserSchema.CreateSchema.openapi({
              example: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
              },
            }),
          },
        },
      },
      responses: {
        201: {
          content: {
            'application/json': { schema: userCreateResponse },
          },
          description: 'Create user',
        },
        400: {
          content: {
            'application/json': {
              schema: ErrorSchema.openapi({
                example: {
                  error: {
                    email: ['Required'],
                    firstName: ['Required'],
                    lastName: ['Required'],
                  },
                },
              }),
            },
          },
          description: 'Create user Error',
        },
      },
      tags: ['User'],
    },
  },
};

export const setupPostRoutes = (userService: UserService) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const input = UserSchema.CreateSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ error: input.error.flatten().fieldErrors });
      return;
    }
    const user = await userService.create(input.data);
    if (!user) {
      res.status(400).json({ error: 'Create user error' });
      return;
    }
    res.status(201).json(Helpers.fromObjectToSchema(userCreateResponse)(user));
  });

  return router;
};

export const docs = [userCreateDocs];
