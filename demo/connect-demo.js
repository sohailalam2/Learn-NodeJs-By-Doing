var connect = require('connect'),
    HttpHelper = require('./http-helper'), // Custom module for http helper methods
    time = require('./request-time'), // A middleware to log requests that take too long to resolve
    fs = require('fs'),
    users = require('./users'); // Requiring users.json directly

// Initialize a new helper module
var http_helper = new HttpHelper();

var server = connect.createServer();

/* Connect Middlewares */
server
//    .use(connect.static(__dirname + '/public'))
.use(connect.bodyParser())
    .use(connect.cookieParser())
    .use(connect.session({
        secret: "my-secret"
    }))
    .use(connect.logger('dev'));

// A middleware to log requests that take too long to resolve
server.use(time({
    time: 500 // Limit the max response time to 500 ms
}));

// Check if the user is already logged in or not from the session information
server.use(function (req, res, next) {
    if ('/' === req.url && req.session.logged_in) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('Welcome back : ' + req.session.name + '<br /><br /><a href="/logout">Logout</a>');
    } else {
        next();
    }
});

// If the user is not logged in then show the index.html page
server.use(function (req, res, next) {
    if ('/' === req.url && 'GET' === req.method) {
        http_helper.sendIndexPage(req, res);
    } else {
        next();
    }
});

// Handle user login and set the session
server.use(function (req, res, next) {
    if ('/login' === req.url && 'POST' === req.method) {
        res.writeHead(200);
        if (!users[req.body.username] || req.body.password !== users[req.body.username].password) {
            res.end('Bad Username/Password combination!!');
        } else {
            req.session.logged_in = true;
            req.session.name = users[req.body.username].name;
            res.end('Welcome ' + req.session.name + ', you are authenticated');
        }
    } else {
        next();
    }
});

// Handle user logout and unset the session
server.use(function (req, res, next) {
    if ('/logout' === req.url) {
        req.session.logged_in = false;
        res.writeHead(200);
        res.end(req.session.name + ', you have been logged out!!');
    } else {
        next();
    }
});

// To simulate a slow response
server.use(function (req, res, next) {
    if ('GET' === req.method && '/slow' === req.url) {
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
    if ('GET' === req.method && '/fast' === req.url) {
        res.writeHead(200);
        res.end('Fast!!');
    } else {
        next();
    }
});

server.use(function (req, res, next) {
    if ('POST' === req.method && req.body) {
        console.log(req.body);

        //        fs.readFile(req.body.file.path, 'utf-8', function (err, data) {
        //            if (err) {
        //                http_helper.send500(req, res);
        //                return;
        //            }
        //
        //            res.writeHead(200, {
        //                'Content-Type': 'text/html'
        //            });
        //            res.end("Received... " + req.body.file.name + " --->  " +
        //                req.body.file.type + " <br /><br /> " + data);
        //        });
        http_helper.send200(req, res);
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
