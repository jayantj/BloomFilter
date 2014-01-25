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

	function Player(id, socket)
	{
		this.id = id
		this.socket = socket
		this.world = new b2World(new b2Vec2(0, CONST.gravity), true)
	}

	var players = (function()
	{
		var all = []
		var lastID = 0
		var addPlayer = function(socket)
		{
			var id = socket.id
			all.push(new Player(id, socket))
			socket.emit('createWorld', CONST.gravity)
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