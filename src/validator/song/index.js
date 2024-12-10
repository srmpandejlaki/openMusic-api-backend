const InvariantError = require('../../exceptions/InvariantError');
const { SongPayLoadSchema } = require('./schema');

const SongValidator = {
  validateSongPayLoad: (payload) => {
    const validationResult = SongPayLoadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongValidator;
