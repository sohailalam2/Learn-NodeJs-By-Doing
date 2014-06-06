var http = require('http'),
    fs = require('fs'),
    HttpHelper = require('./http-helper'), // Custom module for http helper methods
    queryString = require('querystring'); // For parsing query strings such as abc=xyz

// Initialize a new helper module
var http_helper = new HttpHelper();

// Creating a HTTP Server
var server = http.createServer(function (req, res) {

    var url = req.url, // Get the URL the client requested
        body = '';

    // accumulate the body chunk by chunk
    req.on('data', function (chunk) {
        body += chunk;
    });

    // When the response is received successfully with the entire body,
    // process it
    req.on('end', function () {
        if (url) {
            switch (url) {
            case '/':
                http_helper.sendIndexPage(req, res);
                break;
            case '/info':
                if ('POST' == req.method) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.end('<p>CONTENT TYPE: ' + req.headers['content-type'] + '</p><p>Your name is: ' + queryString.parse(body).name + '</p>');
                } else {
                    http_helper.send400(req, res);
                }
                break;
            default:
                http_helper.send404(req, res);
            }
        } else {
            http_helper.send400(req, res);
        }
    });

});

// Start listening for new connections
server.listen(3333, function () {
    console.log('HTTP Server listening on *:3333\r\n');
});
