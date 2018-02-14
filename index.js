'use strict';

const server = require('./server.js');

server.start(3000, () => {
  console.log('server running on port', 3000);
});
