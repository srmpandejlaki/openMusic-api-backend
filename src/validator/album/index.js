const InvariantError = require('../../exceptions/InvariantError');
const { AlbumPayLoadSchema } = require('./schema');

const AlbumValidator = {
  validateAlbumPayLoad: (payload) => {
    const validationResult = AlbumPayLoadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumValidator;
