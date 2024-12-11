/* eslint-disable camelcase */
const mapAlbumDBToModel = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year,
});

const mapSongDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

const mapPlaylistDBToModel = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

module.exports = {
  mapAlbumDBToModel,
  mapSongDBToModel,
  mapPlaylistDBToModel,
};
