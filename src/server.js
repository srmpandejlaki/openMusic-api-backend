const Hapi = require('@hapi/hapi');

const album = require('./api/album/routes');
const song = require('./api/song/routes');

const init = async () => {
  const server = Hapi.server({
    port: 3000, 
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();