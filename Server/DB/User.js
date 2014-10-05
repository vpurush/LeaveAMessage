var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    AppConfig = require('../Config'),
    db = new Db('LeaveAMessage', new Server(AppConfig.DbServer, AppConfig.DbPort));



var User = function (emailAddress) {
    this.Password = '';
    this.LastSeen = null;
    this.EmailAddress = null;
}


var UserRepository = (function () {

    this.GetUserCollection = function (callBack) {
        db.open(function (err) {
            if (err) {                
                db.close();
                return callBack(err, null);;
            }
            db.createCollection('User', function (err, userCollection) {
                if (err) {                    
                    db.close();
                    return callBack(err, null);
                }
                callBack(null, userCollection);
            });
        });
    };

    this.GetUser = function (emailAddress, callBack) {
        this.GetUserCollection(function (err, uCol) {
            if (err) {                
                db.close();
                return callBack(err, null);;
            }
            uCol.findOne({ EmailAddress: emailAddress }, function (userDbObj) {                
                db.close();
                return callBack(null, userDbObj);
            });
        });
    };

    this.CreateUser = function (emailAddress, password, callBack) {
        this.GetUser(emailAddress, function (err, userObj) {
            if (userObj) {
                db.close();
                var err = new Error("Email already exists");
                return callBack(err);;
            } else {
                this.GetUserCollection(function (err, uCol) {
                    if (err) {                        
                        db.close();
                        return callBack(err);;
                    }
                    var newUser = new User(emailAddress);
                    newUser.Password = password;
                    newUser.LastSeen = new Date();
                    uCol.insert(newUser, function (err, result) {
                        if (err) {                            
                            db.close();
                            return callBack(err);;
                        }
                        db.close();
                        return callBack(null);
                    });
                });
            }
        });
    };
})();

exports = UserRepository;
