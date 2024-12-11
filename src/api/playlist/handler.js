/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayLoad(request.payload);

    const name = request.payload;
    const playlistId = await this._service.addPlaylist({ name });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistHandler(request) {
    const { id } = request.params;
    const playlistId = await this._service.getPlaylist(id);
    return {
      status: 'success',
      data: {
        playlistId,
      },
    };
  }

  async deletePlaylistByIdHandler(request) {
    const { id } = request.params;
    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistHandler;
