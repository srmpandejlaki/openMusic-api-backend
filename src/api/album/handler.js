class AlbumsHandler {
  construtor(albumService) {
    this._albumService = albumService;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  postAlbumHandler(request, h) {
    try {
      const { name, year } = request.payload;
      const albumId = this._albumService.addAlbum({ name, year });
      
      const response = h.response({
          status: 'success',
          message: 'Berhasil menambahkan album',
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

  getAlbumsHandler() {
    const albums = this._albumService.getAlbums();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = this._albumService.getAlbumById(id);
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
      const { id } = request.params;
      this._albumService.editAlbumById(id, request.payload);
      
      return{
        status:'success',
        message: 'Berhasil memperbarui album',
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
      this._albumService.deleteAlbumById(id);
      
      return {
        status: 'success',
        message: 'Berhasil menghapus album',
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

module.exports = AlbumsHandler;