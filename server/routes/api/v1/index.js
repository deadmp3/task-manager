import Router from 'koa-router';
import login from './login';

const controllers = [login];

export default (container) => {
  const router = new Router();
  controllers.forEach(f => f(router, container));
  return router;
};
