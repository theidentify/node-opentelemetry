import { Router } from 'express';
import { BlogService } from '../../types/services/blog';
import { describeRoute } from '../../types/docs.helper';
import { Helpers, BlogSchema } from '../../schema';
import { BlogIdFromString, UserIdFromString } from '../../schema/branded';

const getBlogsResponseSchema = BlogSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).array();

const getBlogsDoc = describeRoute({
  '/blogs': {
    get: {
      responses: {
        200: {
          description: 'Get all blogs',
          content: {
            'application/json': {
              schema: getBlogsResponseSchema,
            },
          },
        },
      },
      tags: ['Blog'],
    },
  },
});

const getBlogByIdResponseSchema = BlogSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const getBlogByIdDoc = describeRoute({
  '/blogs/:blogId': {
    get: {
      responses: {
        200: {
          description: 'Get all blogs',
          content: {
            'application/json': {
              schema: getBlogByIdResponseSchema,
            },
          },
        },
      },
      tags: ['Blog'],
    },
  },
});

const getBlogsByUserIdDoc = describeRoute({
  '/blogs/users/:userId': {
    get: {
      responses: {
        200: {
          description: 'Get all blogs by userid',
          content: {
            'application/json': {
              schema: getBlogsResponseSchema,
            },
          },
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'userId',
          required: true,
          schema: {
            type: 'number',
            required: ['true'],
          },
        },
      ],
      tags: ['Blog'],
    },
  },
});

export const setGetRoutes = (blogService: BlogService) => {
  const app = Router();

  app.get('/', async (req, res) => {
    const blogs = await blogService.findMany();
    const results = Helpers.fromObjectToSchema(getBlogsResponseSchema)(blogs);
    res.json(results);
  });

  app.get('/:blogId', async (req, res) => {
    const blogId = BlogIdFromString(req.params.blogId);
    const blog = await blogService.findById(blogId);
    const result = Helpers.fromObjectToSchema(getBlogByIdResponseSchema)(blog);
    res.json(result);
  });

  app.get('/users/:userId', async (req, res) => {
    const userId = UserIdFromString(req.params.userId);
    const blog = await blogService.findManyByUserId(userId);
    const result = Helpers.fromObjectToSchema(getBlogsResponseSchema)(blog);
    res.json(result);
  });

  return app;
};

export const docs = [getBlogsDoc, getBlogByIdDoc, getBlogsByUserIdDoc];
