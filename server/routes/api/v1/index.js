import Router from 'koa-router';

const controllers = [];

export default (container) => {
  const router = new Router();
  controllers.forEach(f => f(router, container));
  return router;
};