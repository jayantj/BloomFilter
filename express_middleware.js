//Load the stylus module
var stylus = require('stylus');

module.exports.init =  function(app, express) {
	//Configure Express to use Jade
	app.set('views', __dirname + '/templates');
	app.set('view engine', 'jade');
	app.locals.pretty = true;

	//Configure Express to use Stylus
	app.use(stylus.middleware({
	debug: true,
	force: true,
	src: __dirname + '/views/',
	dest: __dirname + '/public/css/',
	// compress: true
	}));

	//Tell express to parse the body
	app.use(express.json());
	app.use(express.urlencoded());

	// Tell express to serve everything from /public
	app.use(express.static(__dirname + '/public'));

	// Tell express to enable routing
	app.use(app.router);

	//Initialize Router
	var router = require('./router.js').initialize(app);
}