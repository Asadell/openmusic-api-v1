const { nanoid } = require('nanoid');
const songs = require('./songs');

const addSongHandler = (request, h) => {
  const { title, year, genre, performer, duration, albumId } = request.payload;
  const id = nanoid(16);

  const newSong = {
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  };

  songs.push(newSong);

  const isSuccess = songs.filter((song) => song.id === id) > 0;
  if (isSuccess !== -1) {
    const response = h.response({
      status: 'success',
      data: {
        songId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'gagal menambahkan lagu',
  });
  response.code(500);
  return response;
};

const getSongsHandler = () => {
  const filteredSongs = songs.map((song) => ({
    id: song.id,
    title: song.title,
    performer: song.performer,
  }));
  console.log(filteredSongs);
  return {
    status: 'success',
    data: {
      songs: filteredSongs,
    },
  };
};

module.exports = { addSongHandler, getSongsHandler };
