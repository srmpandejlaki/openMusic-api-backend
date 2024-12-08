const { AlbumPayLoadSchema } = require('./schema');

const AlbumValidator = {
  validateAlbumPayLoad: (payload) => {
    const validationResult = AlbumPayLoadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = AlbumValidator;
