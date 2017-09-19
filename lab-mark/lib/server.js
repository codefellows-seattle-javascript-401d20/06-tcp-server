'use strict';

const net = require('net');
const faker = require('faker');

const app = net.createServer();
let clients = [];

app.on('connection', (socket) => {
  socket.nickname = faker.internet.userName();
  clients.push(socket);
  socket.write('Welcome to the chatroom!\n');
  socket.write(`Your nickname is ${socket.nickname}\n`);

  // Even handlers
  socket.on('data', (data) => {
    let message = data.toString().trim();

    // Parse @ messages
    if(message.startsWith('@')){
      let words = message.split(' ');
      let command = words[0];
      let value = words.slice(1).join(' ');

      switch(command){
      case '@quit': {
        socket.end(`Goodbye ${socket.nickname}!\n`);
        return;
      }
      case '@list': {
        let nicknames = clients.map(c => c.nickname);
        socket.write(nicknames.join('\n') + '\n');
        return;
      }
      case '@nickname': {
        let nicknames = clients.map(c => c.nickname);

        if (!value)
          return socket.write('Enter a nickname after "@nickname.\n"');

        if (nicknames.includes(value))
          return socket.write(`The nickname ${value} is already taken.`);

        socket.nickname = value;
        socket.write(`Your new nickname is: ${value}\n`);
        return;
      }
      case '@dm': {
        let nicknames = clients.map(c => c.nickname);

        let messagee = words[1];
        let message = words.slice(2).join(' ');

        // Check if message was entered
        if (!message)
          return socket.write(`Enter a message after @dm <username>\n`);

        // Check if user exists.
        if(!nicknames.includes(messagee))
          return socket.write(`The user ${value} is not connected to the server.\n`);

        let index = nicknames.indexOf(messagee);
        clients[index].write(`DM from ${socket.nickname}: ${value}\n`);

        return;
      }
      default: {
        socket.write('try @list or @nickname\n');
      }
      }
    }

    clients.forEach((client) => {
      if(client !== socket)
        client.write(`${socket.nickname}: ${message}\n`);
    });
  });

  let removeClient = (socket) => () => {
    clients = clients.filter((client) => {
      return client !== socket;
    });
  };

  socket.on('error', removeClient(socket));
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
