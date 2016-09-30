//variables objetos de la dependencia
//server: servidor io:socket
var express = require("express"),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(3000);

//1)direccion del servidor req: require, res: respuesta
//cuando se acceda al index se renderize al sgte archivo
app.get("/", function(req,res) {
	res.sendFile(__dirname + '/index.html')
});

//3)genera la conexion al socket luego establecido
//recibira el mensaje segun el nombre que le pusimos en 2) que
//es 'send message' y despues recbibe el mensaje en 'data' y lo emitimos
//a las demas personas con el nombre 'new message'
io.sockets.on('connection', function(socket) {
	socket.on('send message', function(data) {
		io.sockets.emit('new message', data);
	})
});