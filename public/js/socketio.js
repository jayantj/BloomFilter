var socketio = (function()
{
	return {
		init: function(address)
		{	
			socket = io.connect(address);
			socket.on('createWorld', physics.createWorld)
			socket.on('constants', function(data)
			{
				physics.updateConstants(data)
			})
			socket.on('createObject', physics.createObject)
			socket.on('destroyObject', physics.destroyObject)
		}
	}	
})()