/**
 * Created by dseet on 6/3/2014.
 */
function setup(format) {
    var regex = /:(\w+)/g;

    return function logger(req, res, next) {
        var str = format.replace(regex, function(match, property) {
            return req[property];
        });

        console.log(str);           //  log format to console
        next();
    }
}

module.exports = setup;