class AlbumService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const id = nanoid(16);

    const newAlbum = {
      id,
      name,
      year,
    };

    this._albums.push(newAlbum);

    const isSuccess = this._albums.filter((album) => album.id === id) > 0;
    if (!isSuccess) {
      throw new Error('Album gagal ditambahkan');
    }
    return id;
  }

  // getAlbums() {
  //   return this._albums;
  // }

  getAlbumById(id) {
    const result = this._albums.filter((album) => album.id === id)[0];

    if (!result) {
      throw new Error('Album tidak ditemukan');
    }
    return result;
  }

  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbaharui album. Id tidak ditemukan');
    }

    this._albums[index] = {
      ...albums[index],
      name,
      year,
    };
  }

  deleteAlbumById(id) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new Error('Gagal menghapus album, id tidak ditemukan');
    }
    this._albums.splice(index, 1);
  }
}
module.exports = AlbumsService;
