var lameApp = angular.module('leaveamessage', []);

lameApp.controller('LoginSignUp', function ($scope) {
    var loginClick = function () {
        var i = 0;
        //make server call
    };
    var signUpClick = function () {
        var i = 0;
        //make server call
    };
    $scope.Login = {
        EmailAddress: "",
        Password: "",
        Submit: loginClick

    };
    $scope.SignUp = {
        EmailAddress: "",
        ChoosePassword: "",
        ReEnterPassword: "",
        Submit: signUpClick
    };
});