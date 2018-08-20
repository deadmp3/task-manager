export default (router, {
  buildFormErrors,
  encrypt,
  User,
  Token,
  jwt: { sign, decode },
}) => {
  router
    .use('/login', async (ctx, next) => {
      const { 'device-id': deviceId } = ctx.header;
      if (!deviceId) {
        ctx.status = 422;
        return;
      }
      ctx.state = { ...ctx.state, deviceId };
      await next();
    })
    .post('login', '/login', async (ctx, next) => {
      const { email, password } = ctx.request.body;
      const user = await User.findOne({
        where: { email, passwordDigest: encrypt(password) },
      });
      if (user) {
        ctx.state = { ...ctx.state, userId: user.id };
        await next();
      } else {
        const message = 'E-mail or password were wrong';
        const errors = [
          { path: 'email', message },
          { path: 'password', message },
        ];
        ctx.body = { formErrors: buildFormErrors({ errors }) };
        ctx.status = 422;
        ctx.message = message;
      }
    })
    .put('token', '/login/token', async (ctx, next) => {
      const { token, deviceId } = ctx.state;
      const { userId, iat } = decode(token);
      const t = await Token.findById(deviceId);
      if (t
        && t.token === token
        && iat + Number(process.env.JWT_REFRESH) > (Date.now() / 1000)) {
        ctx.state = { ...ctx.state, userId };
        await next();
      } else {
        ctx.status = 422;
      }
    })
    .delete('login', '/login', async (ctx) => {
      const { deviceId } = ctx.state;
      const t = await Token.findById(deviceId);
      if (t) {
        await t.destroy();
      }
      ctx.status = 204;
    })
    .use('/login', async (ctx) => {
      const { deviceId, userId } = ctx.state;
      const user = await User.findById(userId);
      if (!user) {
        ctx.status = 422;
        return;
      }
      const token = sign({ userId, isAuthenticated: true });
      const data = { deviceId, token, userId };
      const t = await Token.findById(deviceId);
      if (t) {
        await t.update(data);
      } else {
        const newT = await Token.build(data);
        await newT.save();
      }
      ctx.body = { token, user };
      ctx.status = 201;
    });
};
