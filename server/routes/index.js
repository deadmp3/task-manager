import getApi from './api/v1';

export default (router, container) => {
  const apiRouter = getApi(container);

  return router
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods())
    .get('*', (ctx) => {
      ctx.render('index', { title: 'Task manager by Sergey' });
    });
};
