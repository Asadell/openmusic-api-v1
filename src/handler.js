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

const editAlbumByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, year } = request.payload;

  const index = albums.findIndex((album) => (album.album_id = id));

  if (index !== -1) {
    albums[index] = {
      ...albums[index],
      title,
      year,
    };

    const response = h.response({
      status: 'success',
      message: 'Berhasil update album',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal update album, Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addAlbumsHandler,
  editAlbumByIdHandler,
  // getNoteByIdHandler,
  // deleteNoteByIdHandler,
};
