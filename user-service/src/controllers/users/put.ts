import { Router } from 'express';
import { UserService } from '../../types/services/user';
import { describeRoute } from '../../types/docs.helper';
import { Helpers, UserSchema } from '../../schema';
import { UserIdFromString } from '../../schema/branded';

const updateUserByIdResponseSchema = UserSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const updateUserDoc = describeRoute({
  '/users/:userId': {
    put: {
      responses: {
        200: {
          description: 'Update user',
          content: {
            'application/json': {
              schema: updateUserByIdResponseSchema,
            },
          },
        },
      },
      tags: ['User']
    },
  },
});

export const setupPutRoutes = (userService: UserService) => {
  const app = Router();

  app.put('/:userId', (req, res) => {
    const userId = UserIdFromString(req.params.userId);
    const input = UserSchema.UpdateSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ error: input.error.flatten().fieldErrors });
      return;
    }
    const user = userService.update(userId, input.data);
    const result = Helpers.fromObjectToSchema(updateUserByIdResponseSchema)(
      user
    );
    res.json(result);
  });

  return app;
};

export const docs = [updateUserDoc];
