/**
 * Request time middleware.
 *
 * A middleware (for Connect JS) to log requests that take too long to resolve
 *
 * Options:
 *      - 'time' ('Number'): number of ms after which you log (100)
 *
 * @param {Object} options
 * @api public
 */

module.exports = function (opts) {

    // set the time if given, else defaults to 100 ms
    var time = opts.time || 100;

    // Return the function that becomes the middleware
    return function (req, res, next) {

        // Create a timer that fires within the time specified
        var timer = setTimeout(function () {
            console.log(
                '\033[90m%s %s \033[91m is taking too long! \033[39m',
                req.method, req.url
            );
        }, time);

        // Make sure to cancel it if the response finishes within the given limit
        // This can be done by overriding function (also called monkey-patch)

        // Keep the reference to the original function
        var end = res.end;
        // Override the function
        res.end = function (chunk, encoding) {
            // Restore the orignal function
            res.end = end;
            // Call it
            res.end(chunk, encoding);
            // Finally clear the timer
            clearTimeout(timer);
        };

        // Must call next() so that other middlewares get called
        next();
    };
};
