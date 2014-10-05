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

var authenticator = {
    Configure: function (expressApp) {
        expressApp.use(passport.initialize());
        expressApp.use(passport.session());
    },
    Authenticate: passport.authenticate('local', { failureRedirect: '/login-signup' })
};

module.exports = authenticator;