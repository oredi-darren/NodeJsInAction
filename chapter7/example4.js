/**
 * Created by dseet on 6/4/2014.
 */
var connect = require('connect');
var app = connect()
    .use(connect.limit('32kb'))
    .use(connect.bodyParser())
    .use(function (req, res) {
        console.log(req.body);
        console.log(req.files);
        res.end('thanks');
    })
    .listen(3000);