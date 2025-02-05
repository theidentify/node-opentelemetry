import {
  BatchSpanProcessor,
  // TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrismaInstrumentation } from '@prisma/instrumentation';

export const setupTracing = async () => {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

  const resource = new Resource({
    [ATTR_SERVICE_NAME]: process.env.SERVICE_NAME || 'Node Opentelemetry',
    [ATTR_SERVICE_VERSION]: process.env.npm_package_version || '1.0.0',
  });

  const otlpExporter = new OTLPTraceExporter({
    url:
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
      'http://localhost:4318/v1/traces',
  });

  const sdk = new NodeSDK({
    resource,
    // sampler: new TraceIdRatioBasedSampler(0.1),
    traceExporter: otlpExporter,
    instrumentations: [
      new PrismaInstrumentation(),
      getNodeAutoInstrumentations(),
    ],
    spanProcessors: [
      new BatchSpanProcessor(otlpExporter, {
        maxQueueSize: 100,
        scheduledDelayMillis: 5000,
        exportTimeoutMillis: 30000,
        maxExportBatchSize: 50,
      }),
    ],
  });

  sdk.start();

  return new Promise((resolve) => {
    process.nextTick(() => {
      diag.info('Initial Instrumentation Successfully');
      resolve(true);
    });
  });
};

setupTracing();
