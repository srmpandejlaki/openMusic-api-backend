const Joi = require('joi');

const AlbumPayLoadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(2000).max(new Date().getFullYear())
    .required(),
});

module.exports = { AlbumPayLoadSchema };
