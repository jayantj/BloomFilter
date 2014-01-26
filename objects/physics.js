(function() 
{
	var CONST = require('./const.json') 
	Box2D = require("box2dnode"),
	b2Vec2 = Box2D.b2Vec2,
  	b2AABB = Box2D.b2AABB,
	b2BodyDef = Box2D.b2BodyDef,
	b2Body = Box2D.b2Body,
	b2FixtureDef = Box2D.b2FixtureDef,
	b2Fixture = Box2D.b2Fixture,
	b2World = Box2D.b2World,
	b2MassData = Box2D.b2MassData,
	b2PolygonShape = Box2D.b2PolygonShape,
	b2CircleShape = Box2D.b2CircleShape,
	b2DebugDraw = Box2D.b2DebugDraw,
  	b2MouseJointDef =  Box2D.b2MouseJointDef

  	var physics = (function()
  	{
		var minDimension = CONST.minDimension
		var wThickness = CONST.wThickness
		var dimensions = {'width':(CONST.maxX-CONST.minX), 'height':(CONST.maxY-CONST.minY)}, scale = 1
		var world = new b2World(new b2Vec2(0, CONST.gravity), true)
		var init = function()
		{
			createBounds()
	     	setInterval(update, 1000 / 60);
		}
		var update = function()
		{
			world.Step(1 / 60, 10, 10);
	        world.ClearForces();
		}
		var createBounds = function()
		{
			var bodyDef = new b2BodyDef
			var fixDef = createFixtureDef()
		    bodyDef.type = b2Body.b2_staticBody
		    fixDef.shape = new b2PolygonShape

		    fixDef.shape.SetAsBox(dimensions.width/(2*scale), wThickness/2)
		    bodyDef.position.Set(dimensions.width/(2*scale), wThickness/2)
		    world.CreateBody(bodyDef).CreateFixture(fixDef)

		    bodyDef.position.Set(dimensions.width/(2*scale), dimensions.height/scale - wThickness/2)
		    world.CreateBody(bodyDef).CreateFixture(fixDef)

		    fixDef.shape.SetAsBox(wThickness/2, dimensions.height/(2*scale))
		    bodyDef.position.Set(wThickness/2, dimensions.height/(2*scale))
		    world.CreateBody(bodyDef).CreateFixture(fixDef)

		    bodyDef.position.Set(dimensions.width/scale - wThickness/2, dimensions.height/(2*scale))
		    world.CreateBody(bodyDef).CreateFixture(fixDef)
		}
		var createFixtureDef = function(d, f, r)
		{	
	        var fixDef = new b2FixtureDef
	        fixDef.density = d||1
	        fixDef.friction = f||0.5
	        fixDef.restitution = r||0.2
	        return fixDef
		}
		var createCircle = function(radius, d, f, r)
		{
			radius = radius|| Math.random()+minDimension

			var fixDef = createFixtureDef(d, f, r)
			fixDef.shape = new b2CircleShape(radius);

	        var bodyDef = new b2BodyDef;
	        bodyDef.type = b2Body.b2_dynamicBody;

	        var minX = wThickness + radius, maxX = dimensions.width/scale - wThickness - radius
	        var minY = wThickness + radius, maxY = dimensions.height/scale - wThickness - radius

	        var objX = minX + Math.random() * (maxX - minX), objY = minY + Math.random() * (maxY - minY)
	        bodyDef.position.x = objX
	        bodyDef.position.y = objY
	        var body = world.CreateBody(bodyDef)
	        body.CreateFixture(fixDef)
	        
	        return {'body':body, 'radius':radius}
		}

		var createRect = function(height, width, d, f, r)
		{
			height = height|| Math.random()+minDimension
			width = width|| Math.random()+minDimension
			
			var fixDef = createFixtureDef(d, f, r)
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsBox(height/2, width/2)

	        var bodyDef = new b2BodyDef;
	        bodyDef.type = b2Body.b2_dynamicBody;

	        var minX = wThickness + width/2, maxX = dimensions.width/scale - wThickness - width/2
	        var minY = wThickness + height/2, maxY = dimensions.height/scale - wThickness - height/2

	        var objX = minX + Math.random() * (maxX - minX), objY = minY + Math.random() * (maxY - minY)
	        bodyDef.position.x = objX
	        bodyDef.position.y = objY
	        var body = world.CreateBody(bodyDef)
	       	body.CreateFixture(fixDef)

	        return {'body':body, 'w':width, 'h':height}
		}

		return {
			init: init, 
			createRect: createRect,
			createCircle: createCircle,
			getWorld: function()
			{
				return world
			}
		}
  	})()

  	module.exports.physics = physics

 })()