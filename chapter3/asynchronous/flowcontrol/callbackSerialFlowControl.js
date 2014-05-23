/**
 * Created by dseet on 5/23/2014.
 */
setTimeout(function () {
   console.log('I execute first.');
    setTimeout(function () {
        console.log('I execute next.');
        setTimeout(function () {
            console.log('I execute last.');
        }, 100)
    }, 500);
}, 1000);
