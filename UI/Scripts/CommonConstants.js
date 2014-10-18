var CommonConstants = {
    //Login
    LOGIN_SIGNUP_SOCKET_NAMESPACE: '/LoginSignup',
    LOGIN_SERVER_EVENT: 'Login',
    LOGIN_SUCCESS_CLIENT_EVENT: 'LoginSuccess',
    LOGIN_FAILURE_CLIENT_EVENT: 'LoginFailure',
    LOGIN_FAILURE_INVALID_PASSWORD: 'Invalid Password',
    LOGIN_FAILURE_INVLAID_EMAIL: 'Invalid Email',

    //SignUp
    SIGNUP_SERVER_EVENT: 'Signup',
    SIGNUP_SUCCESS_CLIENT_EVENT: 'SignupSuccess',
    SIGNUP_FAILURE_CLIENT_EVENT: 'SignupFailure',
    SIGNUP_FAILURE_EMAIL_EXISTS: 'Email already exists',

    //Common
    ERROR_OCCURRED: 'Error Occurred'
};

var module = module || {};
if (module && module.exports) {
    module.exports = CommonConstants;
}