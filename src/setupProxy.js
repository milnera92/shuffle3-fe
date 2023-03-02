const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/rss',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
};