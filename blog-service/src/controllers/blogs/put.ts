import { Router } from 'express';
import { BlogService } from '../../types/services/blog';
import { describeRoute } from '../../types/docs.helper';
import { BlogSchema, Helpers, UserSchema } from '../../schema';
import { BlogIdFromString, UserIdFromString } from '../../schema/branded';

const updateBlogByIdResponseSchema = UserSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const updateBlogDoc = describeRoute({
  '/blogs/:blogId': {
    put: {
      responses: {
        200: {
          description: 'Update blog',
          content: {
            'application/json': {
              schema: updateBlogByIdResponseSchema,
            },
          },
        },
      },
      tags: ['Blog'],
    },
  },
});

export const setupPutRoutes = (blogService: BlogService) => {
  const app = Router();

  app.put('/:userId', (req, res) => {
    const userId = BlogIdFromString(req.params.userId);
    const input = BlogSchema.UpdateSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ error: input.error.flatten().fieldErrors });
      return;
    }
    const blog = blogService.update(userId, input.data);
    const result = Helpers.fromObjectToSchema(updateBlogByIdResponseSchema)(
      blog
    );
    res.json(result);
  });

  return app;
};

export const docs = [updateBlogDoc];
