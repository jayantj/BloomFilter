var draw = (function()
{
	var drawScale 	  =	30.0,
		alphaFactor   = 0.9,
		lineThickness = 1.0
	var cDimensions = {'height':0, 'width': 0}
	var now, previous
	var mspf
	var update = function()
	{
		now = new Date()
		var deltaTime = now - previous
		console.log(deltaTime)
		previous = now
        physics.getWorld().Step(deltaTime/1000, 10, 10);
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
		var squareDimension = (h<w)? h : w
		cDimensions.width = squareDimension, cDimensions.height = squareDimension

		var canvas = $('#game-canvas')[0]
		canvas.width = cDimensions.width
		canvas.height = cDimensions.height
	}
	return {
		init: function(fps)
		{	
			setDimensions()
			mspf = 1000 / fps
	        var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite($('#game-canvas')[0].getContext("2d"));
			debugDraw.SetDrawScale(drawScale);
			debugDraw.SetFillAlpha(alphaFactor);
			debugDraw.SetLineThickness(lineThickness);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			physics.getWorld().SetDebugDraw(debugDraw);
         	previous = new Date()
	     	window.setInterval(update, 1000 / fps);
		},
		showScreen: showScreen,
		getScale: function()
		{
			return drawScale
		},
		getDimensions: function()
		{
			return cDimensions
		}
	}
})()