'use strict';

module.exports = function Client(socket, nickname, remoteAddress) {
  this.socket = socket;
  this.nickname = nickname;
  this.id = remoteAddress.split(':').slice(-1)[0]; // Gets IP of connecting client.
  this.reply;
};
