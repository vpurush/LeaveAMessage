var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    UserRepository = require('../DB/User');

passport.use(new LocalStrategy(function (username, password, done) {
    UserRepository.GetUser(username, function (err, userObj) {
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

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function (data, done) {
    try {
        var user = JSON.parse(data);
        done(null, user);
    }catch(e){
        done(e, null);
    }
});

var authenticator = {
    Configure: function (expressApp, io) {
        expressApp.use(passport.initialize());
        expressApp.use(passport.session());

        io.use(function (socket, next) {
            var passportInitializeMethod = passport.initialize();
            passportInitializeMethod(socket.request, null, next);
        });
        io.use(function (socket, next) {
            var passportSessionMethod = passport.session();
            passportSessionMethod(socket.request, null, next);
        });

    },
    Authenticate: passport.authenticate('local', { failureRedirect: '/login-signup' }),
    AuthenticateCustomCallback: function(req, res, callback){
        passport.authenticate('local', function (err, user, info) {
            if (err) { console.log(err); return; }
            if (!user) { return res.send(info.message); }
            req.logIn(user, function (err) {
                if (err) { console.log(err); return; }
                return res.send(true);
            });
        })(req, res, callback);
    },
    CheckAuthentication: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else{
            return res.redirect('/login-signup');
        }
    }
};

module.exports = authenticator;