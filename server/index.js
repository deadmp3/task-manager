import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import Router from 'koa-router';
import http from 'http';
import addRoutes from './routes';
import getContainer from './container';
//import rollbar from './middlewares/rollbar';
import token from './middlewares/token';
import access from './middlewares/access';
import serve from './middlewares/serve';
import getPug from './middlewares/pug';
//import socket from './socket';

export default async () => {
  const app = new Koa();

  app.use(bodyParser());
  //app.use(rollbar());
  app.use(token());
  app.use(access());
  app.use(await serve());
  app.use(koaLogger());

  const server = http.createServer(app.callback()).listen(process.env.PORT || 3000);
  //const io = socket(server);
  const io = null;

  const router = new Router();
  const container = await getContainer();
  addRoutes(router, { ...container, io });
  app.use(router.allowedMethods());
  app.use(router.routes());

  getPug().use(app);
};
