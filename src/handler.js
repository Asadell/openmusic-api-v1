const { nanoid } = require('nanoid');
const albums = require('./albums');

const addAlbumsHandler = (request, h) => {
  const { name, year } = request.payload;
  const album_id = nanoid(16);

  const newAlbum = { album_id, name, year };
  albums.push(newAlbum);

  const isSuccess =
    albums.filter((album) => album.album_id === album_id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      data: {
        albumId: album_id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Album gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = { addAlbumsHandler };
