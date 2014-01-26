var fs = require('fs');
var helper = require('./helper.js')

function initialize (app){
	
	app.use(function (req, res, next) {
		res.header('Server', 'SDSWS');
  		next();
	});

	app.get('/', function (req, res) {
		res.render('index',
		{
			ip:helper.getIP(),
			port:helper.getPort()
		})
	});

	app.get('*', function(req, res){
		res.redirect('https://sdslabs.co.in/404')
	});
}

module.exports.initialize = initialize;