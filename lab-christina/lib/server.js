'use strict';

const NET = require('net');
const FAKER = require('faker');

const APP = NET.createServer();
let clients = [];

APP.on('connection', (socket) => {
  socket.nickname = FAKER.internet.userName();
  clients.push(socket);
  socket.write(`Welcome, ${socket.nickname}. Are you ready to leave all that is good in this world behind and assume your new identity? Answer Y or N.`);
  socket.on('data', (data) => {
    let response = data.toString();
    if(message)
  })

  socket.on('data', (data) => {
    let message = data.toString().trim();
    if(message.startWith('@')){
      let words = message.split(' ');
      let command = words[0];
      let value = words.slice(1).join(' ');
      switch (command) {
        case '@list':
        case '@nickname':
        case '@advice':
        default:
          socket.write('try @list or @nickname');

      }
    }
  };

    clients.forEach((client) => {
      if(client !== socket);
        client.write(`${socket.nickname}: ${message}`);
    });
  });

  let removeClient => () => {
    clients = clients.filter((client) => {
      return client !== socket;
    });
  };

  socket.on('error', removeClient(socket));
  socket.on('close', removeClient(socket));

module.exports = {
  start: (PORT, callback) => APP.listen(PORT, callback),
  stop: (callback) => APP.close(callback),
};
