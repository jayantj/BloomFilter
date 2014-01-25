var draw = (function()
{
	var drawScale 	  =	30.0,
		alphaFactor   = 0.9,
		lineThickness = 1.0
	var wDimensions = {'height':0, 'width': 0}
	var update = function()
	{
        physics.getWorld().Step(1 / 60, 10, 10);
        physics.getWorld().DrawDebugData();
        physics.getWorld().ClearForces();
	}

	var showScreen = function(id)
	{
		$('.game-layer').hide()
		$('#'+id).show()
	}

	var setDimensions = function()
	{
		var w = $(window).innerWidth(), h = $(window).innerHeight()
		wDimensions.height = h
		wDimensions.width = w
		var canvas = $('#game-canvas')[0]
		canvas.width = wDimensions.width
		canvas.height = wDimensions.height
	}
	return {
		init: function()
		{	
			setDimensions()

	        var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite($('#game-canvas')[0].getContext("2d"));
			debugDraw.SetDrawScale(drawScale);
			debugDraw.SetFillAlpha(alphaFactor);
			debugDraw.SetLineThickness(lineThickness);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			physics.getWorld().SetDebugDraw(debugDraw);
         
	     	window.setInterval(update, 1000 / 60);
		},
		showScreen: showScreen,
		getScale: function()
		{
			return drawScale
		},
		getDimensions: function()
		{
			return wDimensions
		}
	}
})()