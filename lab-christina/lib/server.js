'use strict';

const NET = require('net');
const FAKER = require('faker');

const APP = NET.createServer();
let oldIdentity = [];
let newIdentity = [];


APP.on('connection', (socket) => {
  socket.nickname = FAKER.internet.userName();
  oldIdentity.push(socket);
  socket.write(`Welcome, ${socket.nickname}. Are you ready to leave behind all that is good in this world and assume your new identity? Answer Y or N.`);

  socket.on('data', (data) => {
    switch (expression) {
      case 'Y':
        let socket.fakerName = FAKER.name.findName();
        socket.write(`You will no long be referred to as ${socket.nickname}, forget that you ever were. You're now ${socket.fakerName}`);
        socket.write(`Ple`)
        break;
      case 'N':
        let socket.accessDenied = socket.nickname;
        socket.write(`We're sorry to hear that ${socket.nickname}. You are now considered a threat to national security.`);
        break;
  });


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
