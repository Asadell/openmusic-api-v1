class SongsHandler {
  constructor(service) {
    this._service = service;
  }

  postSongHandler(request, h) {
    try {
      const id = this._service.addSong(request.payload);
      const response = h.response({
        status: 'success',
        data: {
          songId: id,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'gagal menambahkan lagu',
      });
      response.code(400);
      return response;
    }
  }

  getSongsHandler(request, h) {
    try {
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
    } catch (error) {}
  }

  getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song: song,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }

  putSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editSongById(id, request.payload);
      return {
        status: 'success',
        message: 'Berhasil edit lagu',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'gagal edit lagu, id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }

  deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteSongById(id);
      return {
        status: 'success',
        message: 'berhasil menghapus lagu',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'gagal menghapus, id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }
}
