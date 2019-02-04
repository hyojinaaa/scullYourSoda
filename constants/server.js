const SERVER_PORT = 8080;

const SERVER_CONFIGS = {
  PRODUCTION: process.env.NODE_ENV != 'dev',
  PORT: process.env.PORT || SERVER_PORT,
};

module.exports = SERVER_CONFIGS;
