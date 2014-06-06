var http = require('http'),
    fs = require('fs'),
    queryString = require('querystring'); // For parsing query strings such as abc=xyz

// Send a file chunk by chunk
function readAndSendFileAsStream(filename, req, res) {
    var stream = fs.createReadStream(__dirname + '/' + filename, 'utf8');
    stream.on('error', function (err) {
        send500();
    });
    stream.on('data', function (chunk) {
        res.write(chunk);
    });
    stream.on('end', function (chunk) {
        res.end();
    });
}

// Helper function for sending 500 error response
function send500(req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/html'
    });
    res.write('500: Something went wrong...<br /><br />');
    res.end();
}

// Helper function for sending 400 error response
function send400(req, res) {
    res.writeHead(400, {
        'Content-Type': 'text/html'
    });
    res.write('400: Bad Request...<br /><br />');
    res.end();
}

// Helper function for sending 404 error response
function send404(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.write('404: Not Found...<br /><br />');
    res.end();
}

// Helper function for sending the index page
function sendIndexPage(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readAndSendFileAsStream('http-demo.html', req, res);
}

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
                sendIndexPage(req, res);
                break;
            case '/info':
                if ('POST' == req.method) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.end('<p>CONTENT TYPE: ' + req.headers['content-type'] + '</p>\
<p>Your name is: ' + queryString.parse(body).name + '</p>');
                } else {
                    send400(req, res);
                }
            default:
                send404(req, res);
            }
        } else {
            send400(req, res);
        }
    });

});

// Start listening for new connections
server.listen(3333, function () {
    console.log('HTTP Server listening on *:3333\r\n');
});
