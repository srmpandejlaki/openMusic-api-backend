const { SongPayLoadSchema } = require('./schema');

const SongValidator = {
  validateAlbumPayLoad: (payload) => {
    const validationResult = SongPayLoadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = SongValidator;
