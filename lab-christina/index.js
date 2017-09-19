'use strict';

const SERVER = require('./lib/server.js');
const PORT = 3000;

SERVER.start(PORT, () => {
  console.log(`your server is running on PORT:${PORT}`);
});

SERVER.stop(PORT, () => {
  console.log(`Goodbye and GoodLuck `);
})
