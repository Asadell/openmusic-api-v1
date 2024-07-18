const { nanoid } = require('nanoid');
const albums = require('./albums');

const addAlbumsHandler = (request, h) => {
  const { name, year } = request.payload;
  const id = nanoid(16);

  const newAlbum = { id, name, year };
  albums.push(newAlbum);

  const isSuccess = albums.filter((album) => album.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      data: {
        albumId: id,
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

const getAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const result = albums.filter((album) => album.id === id)[0];

  if (result) {
    return {
      status: 'success',
      data: {
        album: result,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal - getAlbumByIdHandler',
  });
  response.code(404);
  return response;
};

const editAlbumByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year } = request.payload;

  const index = albums.findIndex((album) => (album.id = id));

  if (index !== -1) {
    albums[index] = {
      ...albums[index],
      name,
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

const deleteAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = albums.findIndex((album) => album.id === id);

  if (index !== -1) {
    albums.splice(index, 1);
    return {
      status: 'success',
      message: 'Berhasil menghapus id',
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal menghapus album',
  });
  response.code(404);
  return response;
};

module.exports = {
  addAlbumsHandler,
  editAlbumByIdHandler,
  getAlbumByIdHandler,
  deleteAlbumByIdHandler,
};
