import { pick } from 'lodash';

const attributes = ['createdAt', 'updatedAt', 'id', 'email', 'firstName', 'lastName', 'fullName'];

export default (router, { io, buildFormErrors, User }) => {
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll({ attributes, raw: true });
      ctx.body = { users };
    })
    .get('user', '/users/:id', async (ctx) => {
      const { id } = ctx.params;
      const user = await User.findById(id);
      ctx.body = { user: user ? pick(user, attributes) : null };
    })
    .post('users', '/users', async (ctx) => {
      const { attributes: attr } = ctx.request.body;
      const user = await User.build(attr);
      try {
        await user.save();
        const data = { user: pick(user, attributes) };
        ctx.body = data;
        ctx.status = 201;
        io.emit('createUser', data);
      } catch (err) {
        console.log(err);
        ctx.body = { formErrors: buildFormErrors(err) };
        ctx.status = 422;
        ctx.message = 'User was not created';
      }
    })
    .use('/users/:id', async (ctx, next) => {
      const { id } = ctx.params;
      const { userId } = ctx.state;
      if (userId !== Number(id)) {
        ctx.status = 422;
        ctx.message = 'User can only edit himself';
        return;
      }
      await next();
    })
    .patch('user', '/users/:id', async (ctx) => {
      const { id } = ctx.params;
      const { attributes: attr } = ctx.request.body;
      const user = await User.findById(id);
      try {
        await user.update(attr);
        ctx.status = 204;
        const data = { user: pick(user, attributes) };
        io.emit('updateUser', data);
      } catch (err) {
        console.log(err);
        ctx.body = { formErrors: buildFormErrors(err) };
        ctx.status = 422;
        ctx.message = 'User was not saved';
      }
    })
    .delete('user', '/users/:id', async (ctx) => {
      const { id } = ctx.params;
      const user = await User.findById(id);
      try {
        await user.destroy();
        ctx.status = 204;
        io.emit('removeUser', id);
      } catch (err) {
        console.log(err);
        ctx.status = 422;
        ctx.message = err.message;
      }
    });
};
