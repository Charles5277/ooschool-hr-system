// src/app.ts

import express, { Express } from 'express';
import session from 'express-session';
import createMemoryStore from 'memorystore';
// import { format, transports } from 'winston';
// import { logger } from 'express-winston';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import Loader from '@/loader';
import { initDataSource } from '@/data-source';
import { errorHandle } from '@/middleware/error';

const app = express();
const memoryStore = createMemoryStore(session);

export default async function appInit(envLoader: Loader): Promise<Express> {
  const { swaggerEnable, swaggerJson, sessSecret } = envLoader;

  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }),
  );

  app.use(
    session({
      cookie: { maxAge: 3600000 },
      store: new memoryStore({
        checkPeriod: 14400000,
      }),
      name: 'test',
      secret: sessSecret,
      rolling: true,
      resave: false,
      saveUninitialized: true,
    }),
  );

  if (swaggerEnable) {
    app.get('/api/docs/json', (_req, res) => res.status(200).json(swaggerJson));
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
  }

  const tsoaRouter = await import('@/routes');
  tsoaRouter.RegisterRoutes(app);

  await initDataSource();

  app.use(errorHandle);

  return app;
}
