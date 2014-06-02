/**
 * Created by dseet on 6/2/2014.
 */
var http = require('http');
http.createServer(function (req, res) {
    res.end('Hello World\n');
}).listen(3000);
