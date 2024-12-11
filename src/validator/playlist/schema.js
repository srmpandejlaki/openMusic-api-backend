const Joi = require('joi');

const PostPlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PostSongInPlaylistSchema = Joi.object({
  name: Joi.string().required();
});

module.exports = { 
  PostPlaylistPayloadSchema,
  PostSongInPlaylistSchema,
};