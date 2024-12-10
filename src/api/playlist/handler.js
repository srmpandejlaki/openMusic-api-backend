const autoBind = require('auto-bind');

class PlaylistHandler {
  constructor() {
    this._playlistService = playlistService;
    this._validator = validator;
    autoBind(this);
  }
}

module.exports = PlaylistHandler;
