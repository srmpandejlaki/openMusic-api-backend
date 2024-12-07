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
}
module.exports = AlbumService;