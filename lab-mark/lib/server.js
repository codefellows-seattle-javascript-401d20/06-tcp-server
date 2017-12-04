'use strict';

const net = require('net');
const faker = require('faker');
const Client = require('./Client.js');

const app = net.createServer();

let validCommands = {
  '@help': 'Lists all of these commands',
  '@list': 'Lists all the users connected to the chatroom by nickname.',
  '@quit': 'Allows users to leave the chatroom.',
  '@nickname <new name>': 'Sets user\'s nickname to new name.',
  '@dm <user> <message>': 'Sends a direct message to specified user.',
  '@r <message>': 'Replies to last user who sent a direct message to you.',
};

let clientPool = [];

app.on('connection', (socket) => {
  let thisClient = new Client(socket, faker.internet.userName(), socket.remoteAddress);
  clientPool.push(thisClient);

  socket.write('Welcome to the chatroom!\n');
  socket.write(`Your current nickname is ${thisClient.nickname}\n`);
  socket.write(`Type "@help" for a list of chatroom commands.\n`);


  // Notify chatroom of new user.
  sayToAll(`${thisClient.nickname} has joined the chatroom.\n`);

  // Socket event handlers
  socket.on('data', (data) => {
    let message = data.toString().trim();

    // Parse @ messages
    if(message.startsWith('@')){
      let words = message.split(' ');
      let command = words[0];
      let value = words.slice(1).join(' ');

      switch(command){
      case '@help': {
        for (let key in validCommands) {
          socket.write(`${key}: ${validCommands[key]}\n`);
        }
        return;
      }
      case '@quit': {
        socket.end(`Goodbye ${thisClient.nickname}!\n`);
        return;
      }
      case '@list': {
        let nicknames = clientPool.map(client => client.nickname);
        socket.write(nicknames.join('\n') + '\n');
        return;
      }
      case '@nickname': {
        let nicknames = clientPool.map(client => client.nickname);

        // No new name entered.
        if (!value)
          return socket.write('Usage: @nickname <new name>\n"');

        // Nickname already taken.
        if (nicknames.includes(value))
          return socket.write(`The nickname "${value}" is already taken.\n`);

        let oldName = thisClient.nickname;
        thisClient.nickname = value;
        socket.write(`Your new nickname is: ${value}\n`);

        sayToAll(`${oldName} changed their name to ${thisClient.nickname}\n`);
        return;
      }
      case '@dm': {
        let nicknames = clientPool.map(client => client.nickname);

        let user = words[1];
        let message = words.slice(2).join(' ');

        // Check if message was entered
        if (!message)
          return socket.write(`Usage: @dm <user> <message>\n`);

        // Check if user exists.
        if(!nicknames.includes(user))
          return socket.write(`The user "${user}" is not connected to the server.\n`);

        let index = nicknames.indexOf(user);
        clientPool[index].socket.write(`DM from ${thisClient.nickname}: ${message}\n`);
        clientPool[index].reply = thisClient.nickname;

        return;
      }
      case '@r': {
        // Nobody messaged you...
        if (!thisClient.reply)
          return socket.write('Usage: @r <message> (only works if someone previously messaged you directly.)\n');

        let nicknames = clientPool.map(client => client.nickname);

        let user = thisClient.reply;
        let message = value;

        // Check if message was entered
        if (!message)
          return socket.write(`Usage: @r <message>\n`);

        // Check if user exists.
        if(!nicknames.includes(user))
          return socket.write(`The user "${user}" is not connected to the server.\n`);

        let index = nicknames.indexOf(user);
        clientPool[index].socket.write(`DM from ${thisClient.nickname}: ${message}\n`);
        clientPool[index].reply = thisClient.nickname;

        return;
      }
      default: {
        socket.write('type @help for a list of valid commands.\n');
        return;
      }
      }
    }

    sayToAll(`${thisClient.nickname}: ${message}\n`);
  });

  // Notifies all other users besides client triggering event.
  function sayToAll(message) {
    clientPool.forEach((client) => {
      if(client.socket !== socket)
        client.socket.write(message);
    });
  }

  let removeClient = (socket) => () => {
    sayToAll(`${thisClient.nickname} left the chatroom.\n`);
    clientPool = clientPool.filter((client) => {
      return client.socket !== socket;
    });
  };

  socket.on('error', (err) => {
    console.error('__SOCKET_ERROR__', err);
    removeClient(socket)(); // Will this work?
  });

  socket.on('close', removeClient(socket));
});

app.on('error', (err) => {
  console.error('__SERVER_ERROR__', err);
});

// export interface
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};
