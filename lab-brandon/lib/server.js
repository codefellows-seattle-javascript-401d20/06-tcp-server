//load env
//require node dependicies
const net = require ('net')
const faker = require('faker')
//create module globals(constants)
const app = net.createServer()
const clients = []

//define module functionality
app.on('connection', (socket) =>{
  socket.nickname = faker.internet.userName()
  console.log('yeaaaaa', socket)
  clients.push(socket)
  socket.write('welcome to the chatroom\n')
  socket.write(`Your nickname is ${socket.nickname}`)


  socket.on('data', (data) => {
    let message = data.toString().trim()
    if(message.startsWith('@')){
      let words = message.split(' ')
      let command = words[0]
      let value = words.slice(1).join(' ')
      switch(command){
        case '@list':
          let nicknames = clients.map(c => c.nickname)
          socket.write(nickname.join('\n'))
          return
        case '@nickname':
          socket.write('under construction')
          return
        default:
          socket.write('try @list or @nickname')
      }
    }

    clients.forEach((client) => {
      if(client !== socket)
        client.write(`${socket.nickname}: ${message}`)
    })
  })

  let removeClient => socket => () => {
    clients = clients.filter((client) => {
      return client !== socket
    })
  }
  socket.on('error', removeClient(socket))
  socket.on('close', removeClient(socket))

})
app.on('error', (err)=>{
  cnosole.error('__SERVER_ERROR__', err)
})

//export interface
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
}
