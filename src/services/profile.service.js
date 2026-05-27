const { ValidateprofileEditData } = require("../utils/validator");
const { BadRequestError, NotFoundError } = require("../utils/errors/app.error");
const { PROFILE_EDITABLE_FIELDS } = require("../constants");
const { toUserDTO } = require("../dtos/user.dto");

const createProfileService = ({ userRepository, connectionRequestRepository }) => {
    const viewProfile = async (user) => {
        if (!user) {
            throw new NotFoundError("user not found");
        }
        return user;
    };

    const editProfile = async (loggedInUser, body) => {
        if (!ValidateprofileEditData({ body })) {
            throw new BadRequestError("u want more user data to edit ");
        }
        Object.keys(body).forEach(j => loggedInUser[j] = body[j]);
        await userRepository.saveUser(loggedInUser);
        return toUserDTO(loggedInUser);
    };

    const deleteAccount = async (userId) => {
        await connectionRequestRepository.deleteMany({
            $or: [
                { SenderConnection: userId },
                { RecieverConnection: userId }
            ]
        });
        await userRepository.deleteUser(userId);
    };

    return { viewProfile, editProfile, deleteAccount };
};

module.exports = createProfileService;
