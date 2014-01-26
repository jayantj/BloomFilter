(function() 
{
	var CONST = require('./const.json') 
	physics = require('./physics.js').physics,
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

	function Player(id, socket)
	{
		this.id = id
		this.socket = socket
		this.bodyInfo = {}
		this.bodyObj = {}
	}

	Player.prototype.getObjInfo = function()
	{
		var bodyInfo = this.bodyInfo, body = this.bodyObj
		var objInfo = {'player':this.id, 'type':bodyInfo.type, 'pos': {'x':body.GetPosition().x, 'y':body.GetPosition().y}}
		switch(bodyInfo.type)
		{
			case 'circle': 	objInfo.radius = bodyInfo.radius
							break
			case 'rect': 	objInfo.w = bodyInfo.w
							objInfo.h = bodyInfo.h
		}

		return objInfo
	}

	Player.prototype.createObject = function()
	{
		var objInfo = {}
		if(Math.random() > 0.5)
		{
			body = physics.createCircle()
			this.bodyInfo = {'type':'circle', 'radius':body.radius}
		}
		else
		{
			body = physics.createRect()
			this.bodyInfo = {'type':'rect', 'w':body.w, 'h':body.h}
		}

		this.bodyObj = body.body
		var objInfo = this.getObjInfo()
		this.socket.emit('createObject', objInfo)
		this.socket.broadcast.emit('createObject', objInfo)
	}

	Player.prototype.getBody = function()
	{
		return this.body
	}

	Player.prototype.updateVelocity = function(data)
	{
		var dx = data.x, dy = data.y
		var body = this.bodyObj
		var currVel = body.GetLinearVelocity()

		currVel.x += dx
		currVel.y += dy
		body.SetLinearVelocity(currVel)

		if(dx)
			dx = dx/Math.abs(dx)
		if(dy)
			dy = dy/Math.abs(dy)

		console.log(this.id, data)
		this.socket.broadcast.emit('updateVelocity', {'player':data.id, 'x':dx, 'y':dy})
	}

	var players = (function()
	{
		var all = []
		var lastID = 0
		var addPlayer = function(socket)
		{
			var id = socket.id
			var newPlayer = new Player(id, socket)
			newPlayer.createObject()
			for(var key in all)
			{
				var player = all[key]
				socket.emit('createObject', player.getObjInfo())
			}
			all.push(newPlayer)
			socket.on('updateVelocity', function(data)
			{
				newPlayer.updateVelocity(data)
			})

		}
		var getPlayer = function(socket)
		{
			for(var key in all)
			{
				var player = all[key]
				if(player.id == socket.id)
					return player
				return {}
			}
		}
		var removePlayer = function(socket)
		{
			for(var key in all)
			{
				var player = all[key]
				if(player.id == socket.id)
				{
					var world = physics.getWorld()
					world.DestroyBody(player.bodyObj)
					socket.broadcast.emit('destroyObject', player.id)
					all.splice(key, 1)
				}
			}
		}
		return {
			addPlayer: addPlayer,
			getPlayer: getPlayer,
			removePlayer: removePlayer
		}
	})()

	module.exports.Player = Player
	module.exports.players = players
})()