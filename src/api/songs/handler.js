const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const id = await this._service.addSong(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        songId: id,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    const songs = await this._service.getSongs();

    const filteredSongs = songs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));
    return {
      status: 'success',
      data: {
        songs: filteredSongs,
      },
    };
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        song: song,
      },
    };
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    await this._service.editSongById(id, request.payload);
    return {
      status: 'success',
      message: 'Berhasil edit lagu',
    };
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    return {
      status: 'success',
      message: 'berhasil menghapus lagu',
    };
  }
}
module.exports = SongsHandler;
