var app = (function()
{
	return {
		init: function(url)
		{
			physics.init()
			draw.init()
			physics.createBounds()
			draw.showScreen('game-screen')

			// socketio.init(url)
		},
	}
})()