const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
// const { mapDBToModelPlaylist } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');
const ForbiddenError = require('../../exceptions/ForbiddenError');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist({ name, ownerId }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist');
    }

    return result.rows[0].id;
  }

  async getPlaylists(ownerId) {
    const query = {
      text: `SELECT p.id, p.name, u.username FROM playlists p 
      JOIN users u ON u.id = p.owner_id
      WHERE owner_id = $1`,
      values: [ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlists tidak ditemukan');
    }

    return result.rows;
  }

  async deletePlaylistById(playlistId) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
  }

  async verifyPlaylistOwner(playlistId, ownerId) {
    const query = {
      text: 'SELECT owner_id FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    if (result.rows[0].owner_id !== ownerId) {
      throw new ForbiddenError('Anda tidak berhak mengakses resource ini');
    }
  }

  async addSongToPlaylist(playlistId, songId) {
    // cek song dulu di handler pake 'verifySongExists'
    const songQuery = {
      text: 'SELECT 1 FROM songs WHERE id = $1',
      values: [songId],
    };

    const songResult = await this._pool.query(songQuery);

    if (!songResult.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    // await this.verifyPlaylistOwner(playlistId, credentialId);

    const id = `playlist_songs-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan lagu ke playlist');
    }
  }

  async getSongsInPlaylistById(playlistId) {
    const playlistQuery = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const playlistResult = await this._pool.query(playlistQuery);

    if (!playlistResult.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const ownerQuery = {
      text: 'SELECT username FROM users WHERE id = $1',
      values: [playlistResult.rows[0].owner_id],
    };

    const ownerResult = await this._pool.query(ownerQuery);

    const songsQuery = {
      text: `SELECT s.id, s.title, s.performer FROM songs s 
      JOIN playlist_songs ps ON ps.song_id = s.id
      WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };

    const songsResult = await this._pool.query(songsQuery);

    if (!songsResult.rows.length) {
      throw new NotFoundError('Tidak ada lagu di playlist');
    }

    const playlistDetails = {
      id: playlistResult.rows[0].id,
      name: playlistResult.rows[0].name,
      username: ownerResult.rows[0].username,
      songs: songsResult.rows.map((song) => ({
        id: song.id,
        title: song.title,
        performer: song.performer,
      })),
    };

    return playlistDetails;
  }

  async deleteSongFromPlaylistById(songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE song_id = $1 RETURNING id',
      values: [songId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal menghapus lagu di playlist');
    }
  }
}

module.exports = PlaylistsService;
