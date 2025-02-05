import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';

interface Env {
  NODE_ENV: 'development' | 'production' | 'test' | 'uat';
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }

  namespace Express {
    interface Request {
      docs?: OpenAPIObject['paths'];
    }
  }

  namespace OTEL {
    interface NodeTracerProvider extends NodeTracerProvider {}
  }
}

export {};
export type IEnv = Env;

