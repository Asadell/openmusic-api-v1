const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(service) {
    this._service = service;
    autoBind(this);
  }

  postAlbumHandler(request, h) {
    try {
      const { name, year } = request.payload;
      const id = this._service.addAlbum({ name, year });

      const response = h.response({
        status: 'success',
        data: {
          albumId: id,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(500);
      return response;
    }
  }

  getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = this._service.getAlbumById(id);
      return {
        status: 'success',
        data: {
          album: album,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { name, year } = request.payload;
      this._service.editAlbumById(id, { name, year });

      return {
        status: 'success',
        message: 'Berhasil update album',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteAlbumById(id);
      return {
        status: 'success',
        message: 'Berhasil menghapus id',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = AlbumsHandler;
