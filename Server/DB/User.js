var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    AppConfig = require('../Config');

var User = function (emailAddress) {
    this.Password = '';
    this.LastSeen = new Date();
    this.EmailAddress = emailAddress;
}


var UserRepository = function () {
    var self = this;

    self.GetDb = function () {
        var db = new Db('LeaveAMessage', new Server(AppConfig.DbServer, AppConfig.DbPort), { w: 0, journal: false, fsync: false });
        return db;
    };

    self.GetUserCollection = function (callBack) {
        var db = self.GetDb();
        db.open(function (err) {
            if (err) {                
                db.close();
                return callBack(err, null);
            }
            db.createCollection('User', function (err, userCollection) {
                if (err) {                    
                    db.close();
                    return callBack(err, null, null);
                }
                callBack(null, userCollection, db);
            });
        });
    };

    self.GetUser = function (emailAddress, callBack) {
        self.GetUserCollection(function (err, uCol, db) {
            if (err) {                
                db.close();
                return callBack(err, null);
            }
            uCol.findOne({ EmailAddress: emailAddress }, function (err, userDbObj) {
                if (err) {
                    db.close();
                    return callBack(err, null);
                }
                db.close();
                return callBack(null, userDbObj);
            });
        });
    };

    self.CreateUser = function (emailAddress, password, callBack) {
        self.GetUser(emailAddress, function (err, userObj) {
            if (userObj) {
                var err = new Error("Email already exists");
                return callBack(err);
            } else {
                self.GetUserCollection(function (err, uCol, db) {
                    if (err) {
                        return callBack(err);
                    }
                    var newUser = new User(emailAddress);
                    newUser.Password = password;
                    uCol.insert(newUser, function (err, result) {
                        if (err) {                            
                            db.close();
                            return callBack(err);
                        }
                        db.close();
                        return callBack(null);
                    });
                });
            }
        });
    };

};

module.exports = new UserRepository();
