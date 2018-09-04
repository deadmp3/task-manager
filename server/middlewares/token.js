const retrieveTokenFromHeader = (ctx) => {
  const { authorization = '' } = ctx.header;
  const bearerStr = 'Bearer ';
  if (authorization.indexOf(bearerStr) === 0) {
    return authorization.replace(bearerStr, '');
  }
  return '';
};

const retrieveToken = ctx => retrieveTokenFromHeader(ctx) || ctx.query.token || '';

export default () => async (ctx, next) => {
  const token = retrieveToken(ctx);
  ctx.state = { ...ctx.state, token };
  await next();
};
