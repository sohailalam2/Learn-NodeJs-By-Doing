module.exports = HttpHelper;

var fs = require('fs'),
    indexFile = 'public/index.html';

function HttpHelper() {

}
// Send a file chunk by chunk
HttpHelper.prototype.readAndSendFileAsStream = function (filename, req, res) {
    // Check whether the file exists or not
    fs.stat(__dirname + '/' + filename, function (err, stat) {
        if (err || !stat.isFile()) {
            this.send500();
            return;
        }
        // Now that it exists - pipe it!!
        fs.createReadStream(__dirname + '/' + filename).pipe(res);
    });
}

// Helper function for sending 500 error response
HttpHelper.prototype.send500 = function (req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/html'
    });
    res.write('500: Something went wrong...<br /><br />');
    res.end();
};

// Helper function for sending 400 error response
HttpHelper.prototype.send400 = function (req, res) {
    res.writeHead(400, {
        'Content-Type': 'text/html'
    });
    res.write('400: Bad Request...<br /><br />');
    res.end();
};

// Helper function for sending 404 error response
HttpHelper.prototype.send404 = function (req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.write('404: Not Found...<br /><br />');
    res.end();
};

// Helper function for sending 404 error response
HttpHelper.prototype.send200 = function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('200: OK<br /><br />');
    res.end();
};

// Helper function for sending the index page
HttpHelper.prototype.sendIndexPage = function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    this.readAndSendFileAsStream(indexFile, req, res);
};
