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
    // try {
    // } catch (error) {
    //   const response = h.response({
    //     status: 'fail',
    //     message: 'gagal menambahkan lagu',
    //   });
    //   response.code(400);
    //   return response;
    // }
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
    // try {
    // } catch (error) {}
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
    // try {
    // } catch (error) {
    //   const response = h.response({
    //     status: 'fail',
    //     message: 'Id tidak ditemukan',
    //   });
    //   response.code(404);
    //   return response;
    // }
  }

  putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    this._service.editSongById(id, request.payload);
    return {
      status: 'success',
      message: 'Berhasil edit lagu',
    };
    // try {
    // } catch (error) {
    //   const response = h.response({
    //     status: 'fail',
    //     message: 'gagal edit lagu, id tidak ditemukan',
    //   });
    //   response.code(404);
    //   return response;
    // }
  }

  deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    this._service.deleteSongById(id);
    return {
      status: 'success',
      message: 'berhasil menghapus lagu',
    };
    // try {
    // } catch (error) {
    //   const response = h.response({
    //     status: 'fail',
    //     message: 'gagal menghapus, id tidak ditemukan',
    //   });
    //   response.code(404);
    //   return response;
    // }
  }
}
module.exports = SongsHandler;
