/**
 * Created by dseet on 6/4/2014.
 */
var connect = require('connect');
var app = connect()
    .use(connect.cookieParser('tobi is a cool ferret'))
    .use(function (req, res) {
        console.log('cookies:' + JSON.stringify(req.cookies));
        console.log('signed cookies:' + JSON.stringify(req.signedCookies));
        res.end('hello\n');
    })
    .listen(3000);