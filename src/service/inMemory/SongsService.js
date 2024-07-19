const { nanoid } = require('nanoid');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({ title, year, genre, performer, duration, albumId }) {
    const id = 'song-' + nanoid(16);

    const newSong = {
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;
    if (!isSuccess) {
      throw new Error('Lagu gagal ditambahkan');
    }
    return id;
  }

  getSongs() {
    return this._songs;
  }

  getSongById(id) {
    const result = this._songs.filter((song) => song.id === id)[0];

    if (!result) {
      throw new Error('Lagu tidak ditemukan');
    }
    return result;
  }

  editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbaharui lagu. Id tidak ditemukan');
    }

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new Error('Gagal menghapus lagu, id tidak ditemukan');
    }
    this._songs.splice(index, 1);
  }
}
module.exports = SongsService;
