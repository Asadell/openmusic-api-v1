const { nanoid } = require('nanoid');
const songs = require('./songs');

const addSongHandler = (request, h) => {
  console.log('halo');
  const { title, year, genre, perfomer, duration, albumId } = request.params;
  const id = nanoid(16);

  const newSong = {
    id,
    title,
    year,
    genre,
    perfomer,
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

module.exports = { addSongHandler };
