const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class PlaylistSongActivitiesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addPlaylistSongActivities(playlistId, songId, userId) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, playlistId, songId, userId, 'add', time],
    };

    await this._pool.query(query);
    await this._cacheService.delete(`playlistactivities:${playlistId}`);
  }

  async deletePlaylistSongActivities(playlistId, songId, userId) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, playlistId, songId, userId, 'delete', time],
    };

    await this._pool.query(query);
    await this._cacheService.delete(`playlistactivities:${playlistId}`);
  }

  async getPlaylistActivitiesById(playlistId) {
    try {
      const data = await this._cacheService.get(
        `playlistactivities:${playlistId}`,
      );
      return {
        isCache: true,
        data: JSON.parse(data),
      };
    } catch (error) {
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

      const data = {
        playlistId,
        activities,
      };

      await this._cacheService.set(
        `playlistactivities:${playlistId}`,
        JSON.stringify(data),
        1800,
      );

      return {
        isCache: false,
        data,
      };
    }
  }
}

module.exports = PlaylistSongActivitiesService;
