exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    owner_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users(id)',
    },
  });
  pgm.createTable('playlist_songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'playlists(id)',
      onDelete: 'cascade',
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'songs(id)',
      onDelete: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('playlists');
  pgm.dropTable('playlistSongs');
};
