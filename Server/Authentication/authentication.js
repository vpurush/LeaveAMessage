var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    UserRepository = require('../DB/User');

passport.use(new LocalStrategy(function (username, password, done) {
    UserRepository.GetUser(function (err, userObj) {
        if (err) { return done(err); }
        if (!userObj) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (userObj.Password != password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, userObj);
    });
}));

exports = passport;