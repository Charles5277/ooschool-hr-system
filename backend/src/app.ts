// src/app.ts
import express, { Response as ExResponse, Request as ExRequest, urlencoded, json } from 'express';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

export const app = express();

app.use('/api/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  // Use path.resolve to get the absolute path of the swagger.json file
  const swaggerJson = await import(path.resolve(__dirname, '../swagger.json'));

  return res.send(swaggerUi.generateHTML(swaggerJson));
});

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

RegisterRoutes(app);
