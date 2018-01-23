'use strict';

const server = require('./lib/server.js');

server.start(4000, () => {
  console.log('server runnning on port', 4000);
});
