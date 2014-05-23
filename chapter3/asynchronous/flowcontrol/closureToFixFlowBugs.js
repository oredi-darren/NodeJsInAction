/**
 * Created by dseet on 5/23/2014.
 */
function asyncFunction(callback) {
    setTimeout(callback, 200);
}

var color = 'blue';
(function (color) {
    asyncFunction(function () {
        console.log('The color is ' + color);
    });
})(color);

color = 'green';