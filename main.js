var Server = require('./lib/server'),
    http_server = require('http').createServer(),
    ecstatic = require('ecstatic');

var main_server = new Server(http_server);
var static_server = ecstatic(__dirname + '/browser');

http_server.on('request', static_server);

http_server.listen(80, function(){
  console.log('HTTP Server booted...');
});

main_server.start();

main_server.on('connected', function(client) {
  console.log("CLIENT CONNECTED!");
});

main_server.on('disconnected', function(client) {
  console.log("CILENT DISCONNECTED!");
});
