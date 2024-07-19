const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const id = this._service.addSong(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        songId: id,
      },
    });
    response.code(201);
    return response;
  }

  getSongsHandler(request, h) {
    const songs = this._service.getSongs();

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

  getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        song: song,
      },
    };
  }

  putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    this._service.editSongById(id, request.payload);
    return {
      status: 'success',
      message: 'Berhasil edit lagu',
    };
  }

  deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    this._service.deleteSongById(id);
    return {
      status: 'success',
      message: 'berhasil menghapus lagu',
    };
  }
}
module.exports = SongsHandler;
