/**
 * Created by dseet on 5/21/2014.
 */
var canadianDollar = 0.91;

function roundTwoDecimals(amount) {
    return Math.round((amount * 100) / 100);
}

// notice that we are setting the properties of the export object to the functions we want to export.
// the reason is export is expected by Nodejs to be a reference to module.exports
exports.canadianToUS = function(canadian) {
    return roundTwoDecimals(canadian * canadianDollar);
};

exports.usToCanadian = function(us) {
    return roundTwoDecimals(us / canadianDollar);
};