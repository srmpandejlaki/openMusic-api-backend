/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapAlbumDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

class AlbumPostgres {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO albums (id, name, year) VALUES ($1, $2, $3) RETURNING id',
      value: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbum() {
    const result = await this._pool.query('SELECT * FROM notes');
    return result.rows.map(mapAlbumDBToModel);
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
 
    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
 
    return result.rows.map(mapAlbumDBToModel)[0];
  }

  async editAlbumById(id, {
    name, year,
  }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }
  }
}
