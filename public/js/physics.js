var physics = (function()
{
	var world
	var wThickness = 1
	var createFixtureDef = function(d, f, r)
	{	
        var fixDef = new b2FixtureDef
        fixDef.density = d||1
        fixDef.friction = f||0.5
        fixDef.restitution = r||0.2
        return fixDef
	}

	var createBounds = function()
	{
		var bodyDef = new b2BodyDef;
		var fixDef = createFixtureDef()
		var dimensions = draw.getDimensions(), scale = draw.getScale()

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

	var getWorld = function()
	{
		return world
	}

	return {
		init: function()
		{
		 	b2Vec2 = Box2D.Common.Math.b2Vec2,
          	b2AABB = Box2D.Collision.b2AABB,
     		b2BodyDef = Box2D.Dynamics.b2BodyDef,
     		b2Body = Box2D.Dynamics.b2Body,
     		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
     		b2Fixture = Box2D.Dynamics.b2Fixture,
     		b2World = Box2D.Dynamics.b2World,
     		b2MassData = Box2D.Collision.Shapes.b2MassData,
     		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
     		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
     		b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
          	b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
         
	        world = new b2World(
	            new b2Vec2(0, 10),    //gravity
				true                 //allow sleep
         	)
		},

		createBounds: createBounds,
		getWorld: getWorld
	}
})()