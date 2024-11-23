const { nanoid } = raquire('nanoid');

class AlbumService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ request, h }) {
    const { name, year } = request.payload;
    const id = nanoid(16);

    const newAlbum = {
      id, name, year,
    };

    this._albums.push(newAlbum);

    const isSuccess = this._albums.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan album',
      });
      response.code(400);
      return response;
    }
  }

  getAlbums() {
    return this._albums;
  }

  getAlbumById(id) {
    const album = this._albums.filter((n) => n.id === id)[0];
    if (!album) {
      const response = h.response({
        status: 'fail',
        message: 'Album tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }

  editAlbumbyId(id, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui album. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    this._albums[index] = {
      ...this._albums[index],
      name, year,
    };
  }

  delateAlbumById(id) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menghapus album. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    this._albums.splice(index, 1);
  }
}

module.expoerts = AlbumService;