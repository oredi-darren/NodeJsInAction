/**
 * Created by dseet on 6/4/2014.
 */
var connect = require('connect');
var app = connect()
    .use(function (req, res) {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);

        res.setHeader('Set-Cookie', 'foo=bar');
        res.setHeader('Set-Cookie', 'tobi=ferret;Expires=' + tomorrow);
        res.end('hello\n');
    })
    .listen(3000);