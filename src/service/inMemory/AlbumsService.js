const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class AlbumsService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const id = 'album-' + nanoid(16);

    const newAlbum = {
      id,
      name,
      year,
    };

    this._albums.push(newAlbum);

    const isSuccess =
      this._albums.filter((album) => album.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Album gagal ditambahkan');
    }
    return id;
  }

  getAlbumById(id) {
    const result = this._albums.filter((album) => album.id === id)[0];

    if (!result) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return result;
  }

  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbaharui album. Id tidak ditemukan');
    }

    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
    };
  }

  deleteAlbumById(id) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal menghapus album, id tidak ditemukan');
    }
    this._albums.splice(index, 1);
  }
}
module.exports = AlbumsService;
