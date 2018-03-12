var Express = require('express'),
	Path = require('path'),
	Favicon = require('serve-favicon'),
// var logger = require('morgan');
	CookieParser = require('cookie-parser'),
	BodyParser = require('body-parser'),
	
	Index = require('./routes/index'),
	Apidocs = require('./routes/apidocs'),
	Api = require('./routes/api'),
	ApiTest = require('./routes/api/test');

var DEBUGLOGGING = true;

var app = Express();

// view engine setup
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(Path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(CookieParser());

// Allows direct serving of anything in public directory
// Do not use "public" in the URL, http://localhost:3000/stylesheets/style.css
app.use(Express.static(Path.join(__dirname, 'public'))); 

app.use('/', Index);
app.use('/apidocs', Apidocs);
app.use('/api', Api);
app.use('/api/test', ApiTest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;