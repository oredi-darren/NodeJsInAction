/**
 * Created by dseet on 6/3/2014.
 */
var url = require('url');

function findUserIdBySlug(match, callback) {
    switch (match) {
        case "darren":
            callback(undefined, 1);
            break;
        case "ruri":
            callback(undefined, 2);
            break;
        case "mari":
            callback(undefined, 3);
            break;
        default:
            callback(undefined);
            break;
    }
}
function rewrite(req, res, next) {
    var path = url.parse(req.url).pathname;
    var match = path.match(/^\/user\/(.+)/);
    if(match) {
        findUserIdBySlug(match[1], function (err, id) {
            if(err) return next(err);
            if(!id) return next(new Error('User not found'));
            req.url = '/user/' + id;
            next();
        });
    } else {
        next();
    }
}

module.exports = rewrite;