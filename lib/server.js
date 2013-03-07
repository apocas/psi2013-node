var sys = require('sys'),
    events = require('events'),
    socketio = require('socket.io');

function Server(listener) {
  this.listener = listener;
  this.clients = [];
}

sys.inherits(Server, events.EventEmitter);

Server.prototype.start = function() {
  var self = this;
  var io = socketio.listen(self.listener);

  io.sockets.on('connection', function (socket) {
    self.clients.push(socket);
    self.emit('connected', socket);

    socket.on('disconnect', function () {
      self.removeClient(this);
      self.emit('disconnected', this);
    });

    socket.on('coords', function (coords) {
      console.log(coords);
      this.broadcast.emit('coords', coords);
    });
  });
};

Server.prototype.removeClient = function(rclient) {
  for(i = 0; i < this.clients.length; i++) {
    if(this.clients[i].id == rclient.id) {
      this.clients.splice(i, 1);
      i = this.clients.length+1;
    }
  }
};

module.exports = Server;