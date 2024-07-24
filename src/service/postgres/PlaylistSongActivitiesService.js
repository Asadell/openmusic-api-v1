const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class PlaylistSongActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSongActivities(playlistId, songId, userId) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, playlistId, songId, userId, 'add', time],
    };

    await this._pool.query(query);
  }

  async deletePlaylistSongActivities(playlistId, songId, userId) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, playlistId, songId, userId, 'delete', time],
    };

    await this._pool.query(query);
  }

  async getPlaylistActivitiesById(playlistId) {
    const query = {
      text: `SELECT u.username, s.title, a.action, a.time 
      FROM playlist_song_activities a 
      JOIN users u ON u.id = a.user_id 
      JOIN songs s ON s.id = a.song_id 
      WHERE a.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    const activities = result.rows.map((data) => ({
      username: data.username,
      title: data.title,
      action: data.action,
      time: data.time,
    }));
    return {
      playlistId,
      activities,
    };
  }
}

module.exports = PlaylistSongActivitiesService;
