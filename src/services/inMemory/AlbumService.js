/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');

class AlbumService {
  constructor() {
    this._album = [];
  }

  addAlbum({ name, year }) {
    const id = nanoid(16);

    const newAlbum = {
      name, year, id,
    };

    this._album.push(newAlbum);

    const isSuccess = this._album.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Album gagal ditambahkan');
    }

    return id;
  }

  getAlbum() {
    return this._album;
  }

  getAlbumById(id) {
    const album = this._album.filter((n) => n.id === id)[0];
    if (!album) {
      throw new Error('Album tidak ditemukan');
    }
    return album;
  }

  editAlbumById(id, { name, year }) {
    const index = this._album.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new Error('Gagal mengubah album. Id tidak ditemukan');
    }

    const update = new Date().toISOString();

    this._album[index] = {
      ...this._album[index],
      name,
      year,
      update,
    };
  }

  deleteAlbumById(id) {
    const index = this._album.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new Error('Gagal menghapus album. Id tidak ditemukan');
    }

    this._album.splice(index, 1);
  }
}
module.exports = AlbumService;