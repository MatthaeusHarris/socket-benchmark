var socket = require('socket.io').listen(8888);
var connections = 0;
var newconnections = 0;

var getCpuCommand = "ps -p " + process.pid + " -u | grep " + process.pid;

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
	var child = exec(getCpuCommand, function(error, stdout, stderr) {
    	var s = stdout.split(/\s+/);
    	var cpu = s[2];
	    var memory = s[3];

	    var l = [
	      'N: ' + newconnections,
	      'C: ' + connections,
	      'CPU: ' + cpu,
	      'Mem: ' + memory
	    ];
	    newconnections = 0;
	    console.log(l.join(',\t'));
	  });
	//console.log("New Connections: " + newconnections + '\t' + "Total Connections: " + connections);
	//newconnections = 0;
}, 1000);