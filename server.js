var express = require('express'),
	favicon = require('serve-favicon'),
	app		= express(),
	path	= require('path'),
	PORT	= 80;

app.use(express.static(path.resolve(__dirname, './dist')));
// app.use(favicon(path.resolve(__dirname, './dist/assets/favicon.png')));

app.all('/*', function(req, res) {
	res.sendFile('index.html', {root: path.resolve(__dirname, './dist')});
});

app.listen(PORT, function(err) {
	if (err)
		console.log(err);
	else
		console.log("Servidor NodeJS: http://localhost:" + PORT + "/");
});
