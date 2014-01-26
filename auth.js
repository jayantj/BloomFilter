var b2d = require("box2dnode")
var objects = require('./objects/objects.js')
var CONST = require('./objects/const.json')
var	physics = require('./objects/physics.js').physics

function initialize(io, express){
	physics.init()
	io.set('authorization', function (data, accept) {
    	return accept(null, true)
	});

	io.sockets.on('connection', function (socket){

		socket.emit('constants', CONST)
		socket.emit('createWorld')

		objects.players.addPlayer(socket)
		
		socket.on('disconnect', function(){
			objects.players.removePlayer(socket)
		});

		// Debug
		socket.on('PING', function(){
			// console.log('PING RECEIVED');
			console.log(objects.players.getPlayer(socket))
		});
	});
}

module.exports.initialize = initialize;