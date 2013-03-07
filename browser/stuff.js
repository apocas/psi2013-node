$(document).on('ready', function() {
  var socket = io.connect('http://localhost');
  socket.on('coords', function (coords) {
    console.log(coords);
    $("#draggable").css('left', coords.left);
    $("#draggable").css('top', coords.top);
  });

  $("#draggable").draggable({
    drag: function(event, ui) {
      socket.emit('coords', {top: ui.position.top, left: ui.position.left});
    }
  });
});