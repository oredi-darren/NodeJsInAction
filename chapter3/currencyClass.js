/**
 * Created by dseet on 5/21/2014.
 */
// Notice that "this" is sprinkle throughout the code as we are accessing this as an object
var Currency = function(canadianDollar) {
    this.canadianDollar = canadianDollar;
};

Currency.prototype.roundTwoDecimals = function(amount) {
    return Math.round((amount * 100) / 100);
}

Currency.prototype.canadianToUS = function(canadian) {
    return this.roundTwoDecimals(canadian * this.canadianDollar);
};

Currency.prototype.usToCanadian = function(us) {
    return this.roundTwoDecimals(us / this.canadianDollar);
};

//exports = Currency; This is incorrect, as it overrides the definition of exports which NodeJs expects to point to module.exports
module.exports = Currency;
