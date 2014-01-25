function initialize(io, express){
	io.set('authorization', function (data, accept) {
    	return accept(null, true);
	});

	io.sockets.on('connection', function (socket){

		socket.on('disconnect', function(){
		});

		// Debug
		socket.on('PING', function(){
			console.log('PING RECEIVED');
		});
	});
}

module.exports.initialize = initialize;
