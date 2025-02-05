import { Router } from 'express';
import { BlogService } from '../../types/services/blog';
import { BlogIdFromString } from '../../schema/branded';
import { Helpers, BlogSchema } from '../../schema';
import { describeRoute } from '../../types/docs.helper';

const deleteBlogByIdResponseSchema = BlogSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const deleteBlogDoc = describeRoute({
  '/blogs/:blogId': {
    delete: {
      responses: {
        200: {
          description: 'Delete blog',
          content: {
            'application/json': {
              schema: deleteBlogByIdResponseSchema,
            },
          },
        },
      },
      tags: ['Blog'],
    },
  },
});

export const setupDeleteRoutes = (blogService: BlogService) => {
  const app = Router();

  app.delete('/:blogId', async (req, res) => {
    const blogId = BlogIdFromString(req.params.blogId);
    const blog = await blogService.remove(blogId);
    const response = Helpers.fromObjectToSchema(deleteBlogByIdResponseSchema)(
      blog
    );
    res.json(response);
  });

  return app;
};

export const docs = [deleteBlogDoc];
