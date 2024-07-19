const { nanoid } = require('nanoid');
const songs = require('./songs');

const addSongHandler = (request, h) => {
  const { title, year, genre, performer, duration, albumId } = request.payload;
  if (!isOk(title, year, genre, performer, duration, albumId)) {
    const response = h.response({
      status: 'fail',
      message: 'gagal menambahkan lagu',
    });
    response.code(400);
    return response;
  }
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
};

const getSongsHandler = () => {
  const filteredSongs = songs.map((song) => ({
    id: song.id,
    title: song.title,
    performer: song.performer,
  }));
  return {
    status: 'success',
    data: {
      songs: filteredSongs,
    },
  };
};

const getSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const result = songs.filter((song) => song.id === id)[0];

  if (result !== undefined) {
    return {
      status: 'success',
      data: {
        song: result,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editSongByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, year, genre, performer, duration, albumId } = request.payload;
  if (!isOk(title, year, genre, performer, duration, albumId)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal edit, input salah',
    });
    response.code(400);
    return response;
  }

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs[index] = {
      ...songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };
    return {
      status: 'success',
      message: 'Berhasil edit lagu',
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal edit lagu, id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs.splice(index, 1);
    return {
      status: 'success',
      message: 'berhasil menghapus lagu',
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal menghapus, id tidak ditemukan',
  });
  response.code(404);
  return response;
};

function isOk(title, year, genre, performer, duration, albumId) {
  return (
    typeof title === 'string' &&
    typeof year === 'number' &&
    typeof genre === 'string' &&
    typeof performer === 'string' &&
    (typeof duration === 'number' || typeof duration === 'undefined') &&
    (typeof albumId === 'string' || typeof albumId === 'undefined')
  );
}

module.exports = {
  addSongHandler,
  getSongsHandler,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
};
