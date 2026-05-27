const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const { validatorcheck } = require("../utils/validator");
const validator = require("validator");

const signup = async (body) => {
    const postvalidation = ["firstName", "lastName", "emailId", "password"];
    const hasAllFields = postvalidation.every(field => field in body);
    if (!hasAllFields) {
        throw new Error("Please include firstName, lastName, emailId, and password");
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
        throw new Error("Invalid email format");
    }
    const user = await userRepository.findOne({ emailId });
    if (!user) {
        throw new Error("Email id not found");
    }
    const passwordcheck = await user.validatePassword(password);
    if (passwordcheck) {
        const token = await user.getJWT();
        return { user, token };
    } else {
        throw new Error("Incorrect password");
    }
};

module.exports = { signup, login };
