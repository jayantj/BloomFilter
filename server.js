var express = require('express');
var app = express();
var e_middle = require('./express_middleware.js');

var authorize = require('./auth.js');
//Load the http module
var http = require ('http');

//Initialize server
var server = http.createServer(app);

//Initialize the socketio module
var io = require('socket.io').listen(server);

//Set the server port
server.listen(8080, console.log("\nCurrent server time is "+ new Date()+'\n'));

e_middle.init(app, express);

authorize.initialize(io, express);

//Pop out a success notification
console.log("Server running on 8080");


