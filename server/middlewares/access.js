import { verify } from '../lib/jwt';

const allowedParameters = [
  {
    match: /.*/,
    exclude: /\/api\//,
    methods: ['GET'],
  },
  {
    match: /\/users$/,
    methods: ['POST'],
  },
  {
    match: /\/login$/,
    methods: ['GET', 'POST', 'DELETE'],
  },
  {
    match: /\/login\/token$/,
    methods: ['PUT'],
  },
];

const accessIsAllowed = ({ url, method }) =>
  !!allowedParameters.find(({ match, exclude, methods }) =>
    match.exec(url)
    && (exclude ? !exclude.exec(url) : true)
    && methods.includes(method));

export default () => async (ctx, next) => {
  if (accessIsAllowed(ctx.request)) {
    await next();
    return;
  }
  const { token } = ctx.state;
  if (token) {
    try {
      const { userId, isAuthenticated } = verify(token);
      ctx.state = { ...ctx.state, userId, isAuthenticated };
      await next();
      return;
    } catch (err) {
      console.log(err);
      ctx.status = 403;
      return;
    }
  }
  ctx.status = 403;
};
