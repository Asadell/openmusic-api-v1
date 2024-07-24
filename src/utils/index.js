const mapDBToModelSong = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

// const mapDBToModelPlaylist = ({ id, name, username }) => ({
//   id,
//   name,
//   username,
// });

module.exports = { mapDBToModelSong };
