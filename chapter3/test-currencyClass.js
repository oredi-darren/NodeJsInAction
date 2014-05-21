/**
 * Created by dseet on 5/21/2014.
 */
var Currency = require('./currencyClass');
var canadianDollar = 0.91;
var currency = new Currency(canadianDollar);


console.log('50 Canadian dollar equals this amount of US dollars:');
console.log(currency.canadianToUS(50));

console.log('30 US dollar equals this amount of Canadian dollars:');
console.log(currency.usToCanadian(30));
