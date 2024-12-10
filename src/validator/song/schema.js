/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');

const SongPayLoadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(2000).max(new Date().getFullYear())
    .required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

module.exports = { SongPayLoadSchema };
