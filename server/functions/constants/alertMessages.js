const SUCCESS = "success";
const ERROR = "error"

const ORDER_PLACED = "Order placed successfully";

const INVALID_EMAIL = "Email must be a valid e-mail address";
const INVALID_PASSWORD = "Invalid password";
const USERNAME_REQUIRED = "Username is required";
const INVALID_ADDRESS = "Address is invalid";
const INVALID_PHONE = "Phone is invalid";
const INVALID_ORDER = "Order is invalid";
const ACCOUNT_CREATED = "Account created";
const AUTH_REQUIRED = "Authentication required";

module.exports.messageType = {
    SUCCESS: SUCCESS,
    ERROR: ERROR
};

module.exports.formValidation = {
    INVALID_EMAIL: INVALID_EMAIL,
    INVALID_PASSWORD: INVALID_PASSWORD,
    USERNAME_REQUIRED: USERNAME_REQUIRED,
    INVALID_ADDRESS: INVALID_ADDRESS,
    INVALID_PHONE: INVALID_PHONE,
    INVALID_ORDER: INVALID_ORDER,
}

module.exports.ORDER_PLACED = ORDER_PLACED;
module.exports.ACCOUNT_CREATED = ACCOUNT_CREATED;
module.exports.AUTH_REQUIRED = AUTH_REQUIRED;