const { ValidateprofileEditData } = require("../utils/validator");
const userRepository = require("../repositories/user.repository");

const viewProfile = async (user) => {
    if (!user) {
        throw new Error("user not found");
    }
    return user;
};

const editProfile = async (loggedInUser, body) => {
    if (!ValidateprofileEditData({ body })) {
        throw new Error("u want more user data to edit ");
    }
    Object.keys(body).forEach(j => loggedInUser[j] = body[j]);
    await userRepository.saveUser(loggedInUser);
    return loggedInUser;
};

module.exports = { viewProfile, editProfile };
