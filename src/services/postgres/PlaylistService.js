/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapPlaylistDBToModel } = require('../../utils/utils');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist({ name }) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlists VALUES ($1, $2) RETURNING id',
      values: [id, name],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylist(id, name, username) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1 AND name = $2 AND username = $3',
      values: [id, name, username],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return mapPlaylistDBToModel(result.rows[0]);
  }

  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new NotFoundError('Playlist gagal dihapus');
    }

    return result.rows[0].id;
  }
}

module.exports = PlaylistService;
