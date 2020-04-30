const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://gifcept.com',
      changeOrigin: true,
    }),
  );

  app.use(
    '/*.(jpg|gif)',
    createProxyMiddleware({
      target: 'https://gifcept.com',
      changeOrigin: true,
    }),
  );
};
