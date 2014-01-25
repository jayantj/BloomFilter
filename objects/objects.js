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
	}

	Player.prototype.createObject = function()
	{
		// console.log(physics)
		var objInfo = {}
		if(Math.random() > 0.5)
			objInfo = physics.createCircle()
		else
			objInfo = physics.createRect()
		this.socket.emit('createObject', objInfo)
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
			all.push(newPlayer)

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
					all.splice(key, 1)
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