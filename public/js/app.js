var app = (function()
{
	return {
		init: function(url)
		{
			physics.init()
			draw.showScreen('game-screen')
			socketio.init(url)

		},
	}
})()