function authenticateWithDatabase(user, pass, callback) {
    var err;
    if(user != 'darren' || pass != 'password')
        err = new Error('Unauthorized');

    callback(err);
}
/**
 * Created by dseet on 6/3/2014.
 */
exports.restrict = function restrict(req, res, next) {
    var authorization = req.headers.authorization;
    if(!authorization) return next(new Error('Unauthorized'));

    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    authenticateWithDatabase(user, pass, function(err) {
        if(err) return next(err);
        next();
    })
}

exports.admin = function admin(req, res, nex) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'text/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}