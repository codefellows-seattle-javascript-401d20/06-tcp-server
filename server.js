'use strict';

const faker = require('faker');
const net = require('net');
const app = net.createServer();

let clients = [];
console.log(clients);

app.on('connection', (socket) => {
  console.log('siiiick', socket);
  socket.nickname = faker.internet.userName();
  clients.push(socket);
  socket.write('Welcome to the chatroom\n');
  socket.write(`Your nickname is ${socket.nickname}\n`);
  socket.write('Type @commands to see a list of commands\n');
  socket.on('data', (data) => {
    let message = data.toString().trim();
    if(message.startsWith('@')){
      let words = message.split(' ');
      let command = words[0];
      let value = words.slice(1).join(' ');
      switch(command){
      case '@commands':
        socket.write('@list: show a list of current users\n @myname: your current nickname\n @nickname: change your nickname\n @dm: direct message a user\n @quit: disconnect from the chat server\n');
        return;
      case '@list':
        let nicknames = clients.map(c => c.nickname);
        socket.write(nicknames.join('\n') + ('\n'));
        return;
      case '@myname':
        socket.write(`${socket.nickname}\n`);
        return;
      case '@nickname':
        socket.nickname = value;
        socket.write(`your new nickname is ${socket.nickname}\n`);
        return;
      case '@dm':
        let targetNickname = words[1];
        let message = words.slice(2).join(' ');
        console.log('incoming dm', targetNickname, message);
        let target = clients.filter((client) => {
          console.log(client.nickname);
          return client.nickname === targetNickname;
        })[0];
        target.write('a message for you: ' + message);
        return;
      case '@quit':
        socket.destroy();
        return;
      default:
        socket.write('try @list or @nickname\n');
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
