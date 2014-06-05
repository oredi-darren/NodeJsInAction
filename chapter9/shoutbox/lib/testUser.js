/**
 * Created by dseet on 6/5/2014.
 */
User = require('./user');
var darren = new User({
    name: 'Darren',
    pass: 'im a seet',
    age:'2'
});

darren.save(function (err) {
    if(err) throw err;
    console.log('user id %d', darren.id);
});

