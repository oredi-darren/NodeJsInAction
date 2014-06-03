/**
 * Created by dseet on 6/3/2014.
 * This is incorrect code
 */
var connect = require('connect');
var admin = require('./listing6_7');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

var app = connect();
app.use(logger)
    .use('/admin', admin.restrict)
    .use('/admin', admin.admin)
    .use(hello)
    .listen(3000);
