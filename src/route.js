const {
  addAlbumsHandler,
  editAlbumByIdHandler,
  // getNoteByIdHandler,
  // deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/albums',
    handler: addAlbumsHandler,
  },
  // {
  //   method: 'GET',
  //   path: '/albums/{id}',
  //   handler: editAlbumByIdHandler,
  // },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: editAlbumByIdHandler,
  },
];

module.exports = routes;
