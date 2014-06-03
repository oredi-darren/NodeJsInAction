/**
 * Created by dseet on 6/3/2014.
 */
var connect = require('connect');
var errorHandler = require('./listing12');

connect()
    .use(function hello(req, res) {
        foo();
        res.setHeader('Content-Type', 'text/plain');
        res.end('hello world');
    })
    .use(function skipped(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('skipped world');
    })
    .use(errorHandler())
    .listen(3000);