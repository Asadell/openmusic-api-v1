const { addSongHandler, getSongsHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/songs',
    handler: addSongHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: getSongsHandler,
  },
];

module.exports = routes;
