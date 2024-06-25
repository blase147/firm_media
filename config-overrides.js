const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    timers: require.resolve('timers-browserify'),
    ...config.resolve.fallback,
  };

  return config;
};
