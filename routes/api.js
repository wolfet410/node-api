var Express = require('express');
var Router = Express.Router();

/* GET users listing. */
Router.get('/', function(req, res, next) {
	res.render('index', { title: 'api' });
});

module.exports = Router;