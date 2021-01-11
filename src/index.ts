import dotenv from 'dotenv';
import log4js from 'log4js';
import { UserController } from './controller/user-controller';
import express, { Express, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import { useExpressServer } from 'routing-controllers';
import { GlobalErrorHandler } from './middleware/global-error-handler';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../src/swagger/openapi.json';
import cors from 'cors';
import config from 'config';

dotenv.config();
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

// const port = process.env.PORT;
const port = config.get('PORT');

const app: Express = express();
app.use(cors() as RequestHandler);
app.use(bodyParser.json());
app.use(httpContext.middleware);
useExpressServer(app, {
  controllers: [UserController], // we specify controllers we want to use
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use((req, res, next) => {
//   httpContext.ns.bindEmitter(req);
//   httpContext.ns.bindEmitter(res);
//   next();
// });

app.listen(port, () => console.log(`Running on port ${port}`));
