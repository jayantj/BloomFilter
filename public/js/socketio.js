var socketio = (function()
{
	return {
		init: function(address)
		{	
			socket = io.connect(address);
			socket.on('createWorld', physics.createWorld)
		}
	}	
})()