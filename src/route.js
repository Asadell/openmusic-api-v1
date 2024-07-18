const { addSongHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/songs',
    handler: addSongHandler,
  },
];

module.exports = routes;
