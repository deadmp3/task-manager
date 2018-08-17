import Pug from 'koa-pug';
import path from 'path';

const viewPath = path.join(__dirname, '..', '..', 'views');
export default () =>
  new Pug({
    viewPath,
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    noCache: process.env.NODE_ENV !== 'production',
    basedir: viewPath,
  });