const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config.json');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: config.proxy,
      changeOrigin: true,
    }),
  );

  app.use(
    '/*.(jpg|gif)',
    createProxyMiddleware({
      target: config.proxy,
      changeOrigin: true,
    }),
  );
};
