![cf](https://i.imgur.com/7v5ASc8.png) Lab 06: TCP Chat Server
======

## Exported Values
* The assignment exports functions comprising a TCP chatroom
* It has an arity of two, composed of the socket connecting the chatroom's users and the `connection` event
* Data limitations are that the callback should be not only a string but specifically `connection`, and the socket should be a socket
* If the data passed in is invalid, the server might technically start, but the user won't be able receive a nickname or send messages

#### Minimum Requirements
* To start your server and connection using telnet:
  * run `node index.js` in the terminal,
  * confirm it has output `server runnning on port 4000`,
  * run `telnet 127.0.0.1 local 4000` in the terminal
* To use the chat room:
  * a different terminal tab or window than where the server and connection were initiated,
  * run `telnet 127.0.0.1 4000`. Chatroom should greet you with `welcome to the chatroom!` and tell you your nickname
  * You can run the following special commands
    * `@quit` to disconnect from the chatroom
    * `@list` to list all connected users
    * `@nickname <new-name>` to change your nickname
    * `@dm <to-username> <message>` to  send a message directly to another user by nickname
