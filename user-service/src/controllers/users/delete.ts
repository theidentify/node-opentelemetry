import { Router } from 'express';
import { UserService } from '../../types/services/user';
import { UserIdFromString } from '../../schema/branded';
import { Helpers, UserSchema } from '../../schema';
import { describeRoute } from '../../types/docs.helper';

const deleteUserByIdResponseSchema = UserSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const deleteUserDoc = describeRoute({
  '/users/:userId': {
    delete: {
      responses: {
        200: {
          description: 'Delete user',
          content: {
            'application/json': {
              schema: deleteUserByIdResponseSchema,
            },
          },
        },
      },
      tags: ['User'],
    },
  },
});

export const setupDeleteRoutes = (userService: UserService) => {
  const app = Router();

  app.delete('/:userId', async (req, res) => {
    const userId = UserIdFromString(req.params.userId);
    const user = await userService.remove(userId);
    const response = Helpers.fromObjectToSchema(deleteUserByIdResponseSchema)(
      user
    );
    res.json(response);
  });

  return app;
};

export const docs = [deleteUserDoc];
