var app = (function()
{
	return {
		init: function(url)
		{
			physics.init()
			draw.init()
			socketio.init(url)
		}
	}
})()