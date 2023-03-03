// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/rss',
//     createProxyMiddleware({
//       target: 'https://shuffle3-be.onrender.com/rss',
//       changeOrigin: true,
//     })
//   );
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/rss',
    createProxyMiddleware({
      target: 'https://shuffle3-be.onrender.com',
      changeOrigin: true,
      pathRewrite: {
        '^/rss': '/rss'
      }
    })
  );
};