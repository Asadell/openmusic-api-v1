const routes = require('./routes');
const AlbumsHandler = require('./handler');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (
    server,
    {
      albumsService,
      storageService,
      albumsValidator,
      uploadsValidator,
    },
  ) => {
    const albumsHandler = new AlbumsHandler(
      albumsService,
      storageService,
      albumsValidator,
      uploadsValidator,
    );
    server.route(routes(albumsHandler));
  },
};
