//dependicies
const server = require('./lib/server.js')

//module functionality
server.start(3000, () =>{
  console.log('server running on port', 3000)
})
