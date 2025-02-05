import express from 'express';
import type { BlogService } from '../../types/services/blog';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { Helpers, BlogSchema } from '../../schema';
import { z } from 'zod';

const blogCreateResponse = BlogSchema.Schema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const ErrorSchema = z.object({
  error: z
    .union([
      z.literal('Create blog error'),
      z.record(
        z.enum([
          ...(Object.keys(BlogSchema.CreateSchema.shape) as [
            keyof typeof BlogSchema.CreateSchema.shape
          ]),
        ]),
        z.string().array()
      ),
    ])
    .describe('Error message or validation errors object'),
});

const blogCreateDocs: ZodOpenApiPathsObject = {
  '/blogs': {
    post: {
      requestBody: {
        content: {
          'application/json': {
            schema: BlogSchema.CreateSchema.openapi({
              example: {
                title: 'Title',
                content: 'My exmaple content',
                userId: 1,
              },
            }),
          },
        },
      },
      responses: {
        201: {
          content: {
            'application/json': { schema: blogCreateResponse },
          },
          description: 'Create blog',
        },
        400: {
          content: {
            'application/json': {
              schema: ErrorSchema.openapi({
                example: {
                  error: {
                    title: ['Required'],
                    content: ['Required'],
                    userId: ['Required'],
                  },
                },
              }),
            },
          },
          description: 'Create blog Error',
        },
      },
      tags: ['Blog'],
    },
  },
};

export const setupPostRoutes = (blogService: BlogService) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const input = BlogSchema.CreateSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ error: input.error.flatten().fieldErrors });
      return;
    }
    const blog = await blogService.create(input.data);
    console.log(blog);
    if (!blog) {
      res.status(400).json({ error: 'Create blog error' });
      return;
    }
    res.status(201).json(Helpers.fromObjectToSchema(blogCreateResponse)(blog));
  });

  return router;
};

export const docs = [blogCreateDocs];
