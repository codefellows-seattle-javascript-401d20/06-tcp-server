'use strict';

const net = require('net');
const faker = require('faker');

const app = net.createServer();

let clientPool = [];

app.on('connection', (socket) => {
  socket.nickname = faker.internet.userName();

  clientPool.push(socket);

  clientPool.forEach((client) => {
    if(client !== socket) {
      client.write(`${socket.nickname} has entered the chatroom.\n`);
    } else {
      socket.write('Welcome to the chatroom!\n');
      socket.write(`Your nickname is ${socket.nickname}.\n`);
    }
  });

  socket.on('data', (data) => {
    let message = data.toString().trim();
    if(message.startsWith('@')){
      let words = message.split(' ');
      let command = words[0];
      let value = words.slice(1).join(' ');
      switch(command){
        case '@quit':
          clientPool.forEach((client) => {
            if(client !== socket)
              client.write(`${socket.nickname} has left the chatroom.\n`);
          });
          socket.end('Logging off, see you next time!\n');
        return;
        case '@list':
          let nicknames = clientPool.map(c => c.nickname);
          socket.write(nicknames.join('\n') + '\n');
          return;
        case '@nickname':
          if (words.length > 2) {
            socket.write('Your nickname cannot contain spaces.\n');
          }
          else {
            let preNickname = socket.nickname;
            let newName = words[1];
            socket.nickname = newName;
            clientPool.forEach((client) => {
              if(client !== socket)
                client.write(`${preNickname} became ${socket.nickname}.\n`);
              else
                socket.write(`You became ${socket.nickname}.\n`);
            });
          }
          return;
        case '@dm':
          if (words.length < 3) {
            socket.write('You must include a nickname and message.\n');
          } else {
            let sendTo = words[1];
            let sendFrom = socket.nickname;
            let found = false;
            clientPool.forEach((client) => {
              if (client.nickname === sendTo) {
                if (found === true) return;
                if (client.nickname === sendTo) {
                  found = true;
                  client.write(`${socket.nickname} says: ${words[2]}\n`);
                }
              }
            });
            if (found === false)
              socket.write('User not currently available.\n');
          }
          return;
        default:
          socket.write('__INPUT_ERROR__: try entering @quit, @list, @nickname "new_nickname", or @dm\n');
      }
    }

    clientPool.forEach((client) => {
      if(client !== socket)
        client.write(`${socket.nickname}: ${message}\n`);
    });
  });

  let removeClient = (socket) => () => {
    clientPool = clientPool.filter((client) => {
      return client !== socket;
    })
  }

  socket.on('error', removeClient(socket));
  socket.on('close', removeClient(socket));
})

app.on('error', (err) => {
  console.error('__SERVER_ERROR__', err);
});

module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
}
