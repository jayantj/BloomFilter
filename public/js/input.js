var input = (function()
{
	var keyHandlers = function()
	{
		$(window).keydown(function(e)
		{
			console.log(e.which)
			switch(e.which)
			{
				case 37: 	physics.updateVelocity({'x':-1, 'y':0})
							break
				case 38: 	physics.updateVelocity({'x':0, 'y':-1})
							break
				case 39: 	physics.updateVelocity({'x':1, 'y':0})
							break
				case 40: 	physics.updateVelocity({'x':0, 'y':1})
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