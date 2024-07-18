const { addAlbumsHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/albums',
    handler: addAlbumsHandler,
  },
];

module.exports = routes;
