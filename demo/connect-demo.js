var connect = require('connect'),
    HttpHelper = require('./http-helper'), // Custom module for http helper methods
    time = require('./request-time'); // A middleware to log requests that take too long to resolve

// Initialize a new helper module
var http_helper = new HttpHelper();

var server = connect.createServer();
server.use(connect.static(__dirname + '/public'));

// This is the logging middle - always run
//server.use(function (req, res, next) {
//    console.info('  %s %s ', req.method, req.url);
//    next();
//});
server.use(connect.logger('dev'));

// A middleware to log requests that take too long to resolve
server.use(time({
    time: 500 // Limit the max response time to 500 ms
}));

// To simulate a slow response
server.use(function (req, res, next) {
    if ('/slow' === req.url) {
        setTimeout(function () {
            res.writeHead(200);
            res.end('Slow!!');
        }, 1000);
    } else {
        next();
    }
});

// To simulate a fast response
server.use(function (req, res, next) {
    if ('/fast' === req.url) {
        res.writeHead(200);
        res.end('Fast!!');
    } else {
        next();
    }
});

// The default 404 handler
server.use(function (req, res, next) {
    http_helper.send404(req, res);
});

// Start listening to server
server.listen(3333, function () {
    console.log('Connect Server has been started successfully on *:3333\n');
});
