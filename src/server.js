const Hapi = require('@hapi/hapi');

const album = require('./api/album');
const song = require('./api/song');
const AlbumService = require('./services/inMemory/AlbumService');
const SongService = require('./services/inMemory/SongService');

const AlbumValidator = require('./validator/album');
const SongValidator = require('./validator/song');

const init = async () => {
  const albumServices = new AlbumService();
  const songServices = new SongService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: album,
      options: {
        service: albumServices,
        validator: AlbumValidator,
      },
    },
    {
      plugin: song,
      options: {
        service: songServices,
        validator: SongValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
