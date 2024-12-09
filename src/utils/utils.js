const mapAlbumSongDBToModel = ({
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
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
});

module.exports = { mapAlbumSongDBToModel, mapSongDBToModel };
