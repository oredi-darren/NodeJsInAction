/**
 * Created by dseet on 6/3/2014.
 * This is incorrect code
 */
var connect = require('connect');
function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}
function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

var app = connect();
app.use(hello)
    .use(logger)// logger never gets called as res.end is called by hello
    .listen(3000);
