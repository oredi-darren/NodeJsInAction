/**
 * Created by dseet on 5/23/2014.
 */
var flow = require('nimble');

flow.series([
    function (callback) {
        setTimeout(function () {
            setTimeout(function () {
                console.log('I execute first.');
                callback();
            }, 1000);
        });
    },
    function (callback) {
        setTimeout(function () {
            setTimeout(function () {
                console.log('I execute next.');
                callback();
            }, 500);
        });
    },
    function (callback) {
        setTimeout(function () {
            setTimeout(function () {
                console.log('I execute last.');
                callback();
            }, 100);
        });
    }
]);
/**
 * Created by dseet on 5/23/2014.
 */
