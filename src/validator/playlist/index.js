const InvariantError = require('../../exceptions/InvariantError');
const { PostPlaylistPayloadSchema, PostSongInPlaylistSchema } = require('./schema');

const PlaylistValidator = {
  validatePlaylistPayLoad: (payload) => {
    const validationResult = PostPlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePlaylistSongPayload: (payload) => {
    const validationResult = PostSongInPlaylistSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistValidator;
