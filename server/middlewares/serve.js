import serve from 'koa-static';
import webpack from 'webpack';
import koaWebpack from 'koa-webpack';
import path from 'path';
import webpackConfig from '../../webpack.config';

export default () => {
  if (process.env.NODE_ENV === 'development') {
    return koaWebpack({ compiler: webpack(webpackConfig) });
  }
  return serve(path.join(__dirname, '../public'));
};
