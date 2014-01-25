var fs = require('fs');

function initialize (app){
	
	app.use(function (req, res, next) {
		res.header('Server', 'SDSWS');
  		next();
	});

	app.get('/', function (req, res) {
		res.render('index',
		{
		})
	});

	app.get('*', function(req, res){
		res.redirect('https://sdslabs.co.in/404')
	});
}

module.exports.initialize = initialize;