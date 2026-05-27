const validator = require("validator");
const { BadRequestError } = require("./errors/app.error");
const { PROFILE_EDITABLE_FIELDS } = require("../constants");

const validatorcheck = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (firstName.length < 4 || firstName.length > 50) {
        throw new BadRequestError("first name is too big or too small");
    }

    if (!validator.isStrongPassword(password)) {
        throw new BadRequestError("password is weak");
    }

    if (!validator.isEmail(emailId)) {
        throw new BadRequestError("invalid email address");
    }
};

const ValidateprofileEditData = (req) => {
    return Object.keys(req.body).every(i => PROFILE_EDITABLE_FIELDS.includes(i));
};

module.exports = { validatorcheck, ValidateprofileEditData };
