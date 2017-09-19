'use strict';

const NET = require('net');
const FAKER = require('faker');
const APP = NET.createServer();
const INDEX = require('./index.js');

let oldIdentity = [];
let clientPool = [];


APP.on('connection', (socket) => {
  socket.nickname = FAKER.internet.userName();
  oldIdentity.push(socket);
  socket.write(`Welcome, ${socket.nickname}. Are you ready to leave behind all that is good in this world and assume your new identity?\n Answer 'Y' or 'N'.`);

  socket.on('data', (data) => {
    switch (expression) {
      case 'Y':
        let socket.fakerName = FAKER.name.findName();
        clientPool.push(socket);//I'm a little confused as to the context of what I am pushing here.
        socket.write(`You will no longer be referred to as ${socket.nickname}, forget that you ever were. You're now ${socket.fakerName}`);
        socket.write('For future communications you will use the following code:\n Do not deviate:\n "@list" for a list of nearby allies.\n "@nickname <chosen-alias>" FOR EMERGENCIES, this will provide you with a new alias.\n "@dm <username> <message>" -To speak to other agents directly\n "@mission" for an encoded mission statement.\n "@quit" to terminate communications & recieve the latitude and longitude of the nearest safehouse. Goodluck.');
        break;
      case 'N':
        let socket.accessDenied = socket.nickname;
        socket.write(`We're sorry to hear that, ${socket.nickname}. You are now considered a threat to national security.`);
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
          let nicknames = clientPool.map(n => clientPool.nickname);
          socket.write(nicknames.join('\n'));//lecture code
          return;
        case '@nickname':
          let newAlias = faker.name.findName();
          //I need to reassign the clients new alias. IDK wihtout testing if findname() accomplishes that but it seems too simple.
        case '@advice':

        case '@quit':
          SERVER.stop(PORT, () => {
          console.log(`Goodbye and GoodLuck `);
        });
        default:
          socket.write('You deviated from the given list of commands, do not do it again. This is you only warning.');//wanted to add a while loop to limit amount of mistakes. IDK how in a switch statement
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
  stop: (PORT, callback) => APP.close(PORT, callback),
};
