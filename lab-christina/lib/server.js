'use strict';

const NET = require('net');
const FAKER = require('faker');

const APP = NET.createServer();
let clients = [];

APP.on('connection', (socket) => {
  socket.nickname = FAKER.internet.userName();
  clients.push(socket);
  socket.write('welcome to the chatroom\n');
  socket.write(`your nickname is ${socket.nickname}`);

  socket.on('data', (data) => {
    let message = data.toString().trim();
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
