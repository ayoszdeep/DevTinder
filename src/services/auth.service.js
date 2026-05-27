const bcrypt = require("bcrypt");
const { validatorcheck } = require("../utils/validator");
const validator = require("validator");
const { BadRequestError } = require("../utils/errors/app.error");
const { SIGNUP_REQUIRED_FIELDS } = require("../constants");

const createAuthService = ({ userRepository }) => {
    const signup = async (body) => {
        const hasAllFields = SIGNUP_REQUIRED_FIELDS.every(field => field in body);
        if (!hasAllFields) {
            throw new BadRequestError("Please include firstName, lastName, emailId, and password");
        }

        const { firstName, lastName, emailId, password, age } = body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = userRepository.createUser({
            firstName,
            lastName,
            emailId: emailId.trim().toLowerCase(),
            password: passwordHash,
            age
        });

        validatorcheck({ body });
        await userRepository.saveUser(user);
        return user;
    };

    const login = async (emailId, password) => {
        if (!validator.isEmail(emailId)) {
            throw new BadRequestError("Invalid email format");
        }
        const user = await userRepository.findOne({ emailId });
        if (!user) {
            throw new BadRequestError("Email id not found");
        }
        const passwordcheck = await user.validatePassword(password);
        if (passwordcheck) {
            const token = await user.getJWT();
            return { user, token };
        } else {
            throw new BadRequestError("Incorrect password");
        }
    };

    return { signup, login };
};

module.exports = createAuthService;
