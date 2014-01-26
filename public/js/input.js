var input = (function()
{
	var keyHandlers = function()
	{
		$(window).keydown(function(e)
		{
			console.log(e.which)
			switch(e.which)
			{
				case 37: 	physics.updateVelocity(-1, 0)
							break
				case 38: 	physics.updateVelocity(0, -1)
							break
				case 39: 	physics.updateVelocity(1, 0)
							break
				case 40: 	physics.updateVelocity(0, 1)
							break
			}
		})
	}

	return {
		init: function()
		{
			keyHandlers()
		}
	}
})()