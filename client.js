var io = require('socket.io-client');
var connections = 0;

function user(host, port) {
	var socket = io.connect('http://' + host + ':' + port, {'force new connection': true});
	socket.on('connect', function() {
		connections++;
		console.log(connections);
		socket.send("This is a test.  This is only a test.");
	});

	socket.on('message', function(message) {
		socket.send(message);
		//socket.disconnect();
	});

	setTimeout(function() { 
		socket.disconnect(); 
		connections--;
		console.log(connections);
	}, 90000);
}

for (var i=0; i<200; i++) {
	setTimeout(function() { 
		user('localhost',8888); 
	}, i*20);
}
