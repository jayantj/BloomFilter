var physics = (function()
{
	var world
	var wThickness = 1
	var numObjects = 10
	var minDimension = 0.5
	
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

	var createCircle = function(radius, d, f, r)
	{
		var dimensions = draw.getDimensions(), scale = draw.getScale()
		radius = radius|| Math.random()+minDimension

		var fixDef = createFixtureDef(d, f, r)
		fixDef.shape = new b2CircleShape(radius);

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;

        var minX = wThickness + radius, maxX = dimensions.width/scale - wThickness - radius
        var minY = wThickness + radius, maxY = dimensions.height/scale - wThickness - radius

        bodyDef.position.x = minX + Math.random() * (maxX - minX)
        bodyDef.position.y = minY + Math.random() * (maxY - minY)
        world.CreateBody(bodyDef).CreateFixture(fixDef);
	}

	var createRect = function(height, width, d, f, r)
	{
		var dimensions = draw.getDimensions(), scale = draw.getScale()
		height = height|| Math.random()+minDimension
		width = width|| Math.random()+minDimension
		
		var fixDef = createFixtureDef(d, f, r)
		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(height/2, width/2)

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;

        var minX = wThickness + width/2, maxX = dimensions.width/scale - wThickness - width/2
        var minY = wThickness + height/2, maxY = dimensions.height/scale - wThickness - height/2

        bodyDef.position.x = minX + Math.random() * (maxX - minX)
        bodyDef.position.y = minY + Math.random() * (maxY - minY)
        world.CreateBody(bodyDef).CreateFixture(fixDef);
	}

	var createObjects = function()
	{
        for(var i = 0; i < numObjects; ++i) 
            if(Math.random() > 0.5) 
				createRect()
	        else 
            	createCircle()
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
		getWorld: getWorld,
		createObjects: createObjects,
		createCircle: createCircle
	}
})()