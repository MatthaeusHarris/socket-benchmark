var io = require('socket.io-client');
var connections = 0;
var index = 0;

function user(host, port) {
	console.log("Attempting to open connection number " + index++);
	var socket = io.connect('http://' + host + ':' + port, {'force new connection': true});
	socket.on('connect', function() {
		connections++;
		console.log(connections);
		socket.send("This is a test.  This is only a test.");
	});

	socket.on('message', function(message) {
//		console.log(message);
//		socket.send(message);
		//socket.disconnect();
	});

	setTimeout(function() { 
		socket.disconnect(); 
		connections--;
		console.log(connections);
	}, 90000);
}

for (var i=0; i<2000; i++) {
	setTimeout(function() { 
		user(process.argv[2], process.argv[3]);
	}, i*10);
}
