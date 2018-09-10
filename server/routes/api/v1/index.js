import Router from 'koa-router';
import login from './login';
import users from './users';

const controllers = [login, users];

export default (container) => {
  const router = new Router();
  controllers.forEach(f => f(router, container));
  return router;
};
