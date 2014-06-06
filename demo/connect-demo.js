var connect = require('connect'),
    HttpHelper = require('./http-helper'); // Custom module for http helper methods

// Initialize a new helper module
var http_helper = new HttpHelper();

var server = connect.createServer();
server.use(connect.static(__dirname + '/public'));

// This is the logging middle - always run
server.use(function (req, res, next) {
    console.info('  %s %s ', req.method, req.url);
    next();
});

// The default 404 handler
server.use(function (req, res, next) {
    http_helper.send404(req, res);
});

// Start listening to server
server.listen(3333, function () {
    console.log('Connect Server has been started successfully on *:3333\n');
});
