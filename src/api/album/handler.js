/* eslint-disable no-underscore-dangle */
class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumHandler = this.getAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  postAlbumHandler(request, h) {
    try {
      this._validator.validateAlbumPayLoad(request.payload);
      const { name = 'untitled', year } = request.payload;

      const albumId = this._service.addAlbum({ name, year });

      const response = h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          albumId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getAlbumHandler() {
    const album = this._service.getAlbum();
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = this._service.getAlbumById(id);
      return {
        status: 'success',
        data: {
          album,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putAlbumByIdHandler(request, h) {
    try {
      this._validator.validateAlbumPayLoad(request.payload);
      const { id } = request.params;

      this._service.editAlbumById(id, request.payload);

      return {
        status: 'success',
        message: 'Album sudah diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteAlbumById(id);

      return {
        status: 'success',
        message: 'Album berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = AlbumHandler;
