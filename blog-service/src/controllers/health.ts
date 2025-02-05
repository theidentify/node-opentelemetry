import express from 'express';
import { z } from 'zod';
import { describeRoute } from '../types/docs.helper';
import opentelemetry, { SpanStatusCode } from '@opentelemetry/api';
import { Errors } from '../schema';

const tracer = opentelemetry.trace.getTracer('controller');
// const metrics = opentelemetry.metrics.getMeter('controller');

const getHealthDocs = describeRoute({
  '/health': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': { schema: z.literal('Ok') },
          },
          description: 'API is Ready',
        },
      },
      tags: ['Health'],
    },
  },
});

// const getHealthErrorResponse = Errors.ErrorSchema('Health Route Error');

// const getHealthErrorDocs = describeRoute({
//   '/health/errors': {
//     get: {
//       responses: {
//         500: {
//           content: {
//             'application/json': {
//               schema: getHealthErrorResponse.openapi({
//                 title: 'This will always error',
//               }),
//             },
//           },
//           description: 'API throw health error',
//         },
//       },
//       tags: ['Health'],
//     },
//   },
// });

export const setupHealthRoutes = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    // const metric = metrics.createCounter('get.health.controller');
    const span = tracer.startSpan('GET /.get.health.controller', {
      attributes: {
        'http.method': req.method,
        endpoint: req.baseUrl,
      },
    });

    span.addEvent('res_parsing', {
      'res.body': JSON.stringify('Ok'),
      'res.statusCode': 200,
    });

    res.status(200).json('Ok');

    // const attributes = {
    //   pid: process.pid,
    //   environment: process.env.NODE_ENV || 'development',
    // };
    // metric.add(1, attributes);
    span.addEvent('res_sent', {});
    span.end();
  });

  // router.get('/errors', (req, res) => {
  //   const span = tracer.startSpan('GET /errors.get.health.controller', {
  //     attributes: {
  //       'http.method': 'GET',
  //       endpoint: '/health/errors',
  //     },
  //   });
  //   span.setStatus({
  //     code: SpanStatusCode.OK,
  //     message: 'This is fake error',
  //   });
  //   const error = new Error('Health Route Error');
  //   span.recordException(error);

  //   res.status(500).json(
  //     getHealthErrorResponse.parse({
  //       code: 'HEALTH_ERROR',
  //       message: error.message,
  //     })
  //   );
  //   span.end();
  // });

  return router;
};

export const docs = [getHealthDocs];
