const Hapi = require('@hapi/hapi');
const album = require('./api/album');
const AlbumService = require('./services/inMemory/AlbumService');

const init = async () => {
  const albumServices = new AlbumService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: album,
    options: {
      service: albumServices,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
