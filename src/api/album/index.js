const AlbumsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Open Music API',
  version: '1.0.0',
  register: async (server, { service }) => {
    const albumsHandler = new AlbumsHandler(service);
    server.route(routes(albumsHandler));
  },
};
