const mapAlbumDBToModel = ({
  id,
  title,
  year,
}) => ({
  id,
  title,
  year,
});

const mapSongDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumID,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: albumID,
});

module.exports = { mapAlbumDBToModel, mapSongDBToModel };
