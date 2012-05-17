var socket = require('socket.io').listen(8888);
var connections = 0;
var newconnections = 0;
socket.set('log level', 1);

socket.on('connection', function (socket) {
	connections++;
	newconnections++;
	socket.emit('message', {hello:'world'});
	socket.on('message',function(data) {
		socket.emit('message', data);
		//console.log(data);
	});
	socket.on('disconnect', function() {
		//console.log("Client disconnected.");
		connections--;
	});
});


setInterval(function() {

	console.log("New Connections: " + newconnections + '\t' + "Total Connections: " + connections);
	newconnections = 0;
}, 1000);