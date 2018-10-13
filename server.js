const net = require('net');
const port = 8000;
const host = '192.168.211.137';

const server = net.createServer();

server.listen(port,host,() =>
	{
		console.log('TCP Server is running on port ' + port + '.');
	});

let sockets = [];

server.on('connection', function(sock)
	{
		console.log('Connected: ' + sock.remoteAddress + ':' + sock.remotePort);
		sockets.push(sock);

		sock.on('data', function(data)
		{
			console.log('data=> ' + sock.remoteAddress + ': ' + data);
			sockets.forEach(function(sock, index,array)
			{
				sock.write(sock.remoteAddress + ':' + sock.remotePort + ' said ' + data + '/n'); 
			});
		});
	


//Close the server

sock.on('close', function(data)
	{
		let index = sockets.findIndex(function(o){
			
			return o.remoteAddress === sock.remoteAddress && o.remotePort===sock.remotePort;
			})

		if(index !== -1) sockets.splice(index, 1);
		console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});
});