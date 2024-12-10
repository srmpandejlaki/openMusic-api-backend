/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateAlbumPayLoad(request.payload);

    const songId = await this._service.addSong(request.playload);

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

  async getSongHandler(request) {
    const { title, performer } = request.query;
    const songs = await this._service.getSong(title, performer);
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
