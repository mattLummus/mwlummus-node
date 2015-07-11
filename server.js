#!/usr/bin/env node

var express = require('express'),
	http = require('http'),
	path = require('path'),
	port = 1976,
	url  = 'http://localhost:' + port + '/';

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || port);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

//TODO: enable server side rendering
//TODO: render landing page from server
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('');
	console.log('Express server listening at: ' + url);
});
