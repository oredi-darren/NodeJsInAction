/**
 * Created by dseet on 6/3/2014.
 */
var connect = require('connect');

connect()
    .use(function hello(req, res) {
        foo();
        res.setHeader('Content-Type', 'text/plain');
        res.end('hello world');
    })
    .listen(3000);