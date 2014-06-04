var connect = require('connect');
var fs = require('fs');

var log = fs.createWriteStream('myapp.log', { flags: 'a' })

function hello(req, res) {
    res.end('hello');
}



var app = connect()
    .use(connect.favicon())
    //.use(connect.logger())
    //.use(connect.logger(':res[Content-Length] :method :url :response-time ms'))
    //.use(connect.logger('dev'))
    .use(connect.logger({ format: ':method :url', stream: log, immediate: true }))
    .use(hello)
    .listen(3000);
