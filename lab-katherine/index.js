'use strict';

// dependencies
const server = require('./lib/server.js');

// module functionality
server.start(4000, () => {
  console.log('server runnning on port', 4000);
});
