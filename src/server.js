/* eslint-disable no-undef */
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const ClientError = require('./exceptions/ClientError');

const album = require('./api/album');
const song = require('./api/song');
const user = require('./api/user');
const authentication = require('./api/authentication');
const playlist = require('./api/playlist');
const AlbumService = require('./services/postgres/AlbumService');
const SongService = require('./services/postgres/SongService');
const UserService = require('./services/postgres/UserService');
const AuthenticationService = require('./services/postgres/AuthenticationService');
const PlaylistService = require('./services/postgres/PlaylistService');
const AlbumValidator = require('./validator/album');
const SongValidator = require('./validator/song');
const UserValidator = require('./validator/user');
const AuthenticationValidator = require('./validator/authentication');
const PlaylistValidator = require('./validator/playlist');
const TokenManager = require('./token/tokenManager');

const init = async () => {
  const albumServices = new AlbumService();
  const songServices = new SongService();
  const userServices = new UserService();
  const playlistServices = new PlaylistService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },

    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
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
    {
      plugin: user,
      options: {
        service: userServices,
        validator: UserValidator,
      },
    },
    {
      plugin: authentication,
      options: {
        authenticationsService: new AuthenticationService(),
        usersService: new UserService(),
        tokenManager: TokenManager,
        validator: AuthenticationValidator,
      },
    },
    {
      plugin: playlist,
      options: {
        service: playlistServices,
        validator: PlaylistValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
