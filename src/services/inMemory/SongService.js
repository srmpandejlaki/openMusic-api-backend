/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');

class SongService {
  constructor() {
    this._song = [];
  }

  addSong({ title, year, genre, performer, duration }) {
    const id = nanoid(16);

    const newSong = {
      title, year, genre, performer, duration, id,
    };

    this._album.push(newSong);

    const isSuccess = this._song.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSong() {
    return this._song;
  }

  getSongById(id) {
    const song = this._song.filter((n) => n.id === id)[0];
    if (!song) {
      throw new Error('Lagu tidak ditemukan');
    }
    return song;
  }

  editSongById(id, { title, year, genre, performer, duration }) {
    const index = this._song.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new Error('Gagal mengubah lagu. Id tidak ditemukan');
    }

    const update = new Date().toISOString();

    this._song[index] = {
      ...this._song[index],
      title,
      year,
      genre,
      performer,
      duration,
      update,
    };
  }

  deleteSongById(id) {
    const index = this._song.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new Error('Gagal menghapus lagu. Id tidak ditemukan');
    }

    this._song.splice(index, 1);
  }
}
module.exports = SongService;
