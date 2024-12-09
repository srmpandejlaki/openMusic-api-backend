/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler(this);
    this.getSongHandler = this.getSongHandler(this);
    this.getSongByIdHandler = this.getSongByIdHandler(this);
    this.putSongByIdHandler = this.putSongByIdHandler(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler(this);

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateAlbumPayLoad(request.payload);
    const {
      title = 'untitled', year, genre = 'untitled', performer = 'untitled', duration = 'untitled',
    } = request.payload;

    const songId = await this._service.addSong({
      title, year, genre, performer, duration,
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongHandler() {
    const songs = await this._service.getSong();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;
    const songs = await this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async putSongByIdHandler(request) {
    this._validator.validateAlbumPayLoad(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Lagu sudah diperbarui',
    };
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = SongHandler;
