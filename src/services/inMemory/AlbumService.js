/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');

class AlbumService {
  constructor() {
    this._album = [];
  }

  addAlbum({ title, body, tags }) {
    const id = nanoid(16);

    const newAlbum = {
      title, tags, body, id,
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

  editAlbumById(id, { title, body, tags }) {
    const index = this._album.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new Error('GAGAL MEMPERBARUI CATATAN. ID TIDAK DITEMUKAN');
    }

    const update = new Date().toISOString();

    this._album[index] = {
      ...this._album[index],
      title,
      tags,
      body,
      update,
    };
  }

  deleteAlbumById(id) {
    const index = this._album.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new Error('GAGAL MEMPERBARUI CATATAN. ID TIDAK DITEMUKAN');
    }

    this._album.splice(index, 1);
  }
}
module.exports = AlbumService;