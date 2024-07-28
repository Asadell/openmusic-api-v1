const autoBind = require('auto-bind');
const config = require('../../utils/config');

class AlbumsHandler {
  constructor(
    albumsService,
    storageService,
    albumsValidator,
    uploadsValidator
  ) {
    this._albumsService = albumsService;
    this._storageService = storageService;
    this._albumsValidator = albumsValidator;
    this._uploadsValidator = uploadsValidator;
    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._albumsValidator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const id = await this._albumsService.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId: id,
      },
    });
    response.code(201);

    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._albumsService.getAlbumById(id);

    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._albumsValidator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;
    await this._albumsService.editAlbumById(id, { name, year });

    return {
      status: 'success',
      message: 'Berhasil update album',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._albumsService.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Berhasil menghapus id',
    };
  }

  async postUploadAlbumHandler(request, h) {
    const { id: albumId } = request.params;
    const { cover } = request.payload;
    this._uploadsValidator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const fileLocation = `http://${config.app.host}:${config.app.port}/albums/file/images/${filename}`;
    await this._albumsService.editCoverAlbumById(albumId, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);

    return response;
  }

  async postAlbumLikeByIdHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._albumsService.isAlbumExistById(albumId);
    await this._albumsService.isAlbumLikedByUser(userId, albumId);
    await this._albumsService.addAlbumLikeById(userId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Like added successfully',
    });
    response.code(201);

    return response;
  }

  async deleteAlbumLikeByIdHandler(request) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._albumsService.deleteAlbumLikeById(userId, albumId);

    return {
      status: 'success',
      message: 'Like removed successfully',
    };
  }

  async getAlbumLikeCountHandler(request, h) {
    const { id: albumId } = request.params;

    const { isCache, result } = await this._albumsService.getAlbumLikeCount(
      albumId
    );

    const response = h.response({
      status: 'success',
      data: {
        likes: result,
      },
    });

    if (isCache) {
      response.header('X-Data-Source', 'cache');
    } else {
      response.header('X-Data-Source', 'not-cache');
    }

    return response;
  }
}

module.exports = AlbumsHandler;
