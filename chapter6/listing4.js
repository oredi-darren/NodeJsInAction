/**
 * Created by dseet on 6/3/2014.
 * This is incorrect code
 */
var connect = require('connect');
function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}
function restrictFileAccess(req, res, next) {
    // simulate file access error
    switch (req.url) {
        case '/':
            next();
            break;
        default:
            res.statusCode = 401;
            res.end("Unauthorized access");
            break;
    }
}
function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}



var app = connect();
app.use(logger)
    .use(restrictFileAccess)
    .use(hello)
    .listen(3000);
