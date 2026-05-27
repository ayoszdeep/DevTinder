const logger = require("../utils/logger");
const { toUserDTO } = require("../dtos/user.dto");

const createProfileController = ({ profileService }) => {
    const view = async (req, res, next) => {
        try {
            const user = toUserDTO(await profileService.viewProfile(req.user));
            res.send(user);
        } catch (error) {
            logger.error(error);
            res.status(error.statusCode || 400).send("Error: " + error.message);
        }
    };

    const edit = async (req, res, next) => {
        try {
            const loggedInUser = await profileService.editProfile(req.user, req.body);
            res.send(`${loggedInUser.firstName},  user updated succesfully`);
        } catch (error) {
            logger.error(error);
            res.status(404).send("ERROR : " + error.message);
        }
    };

    const deleteAccount = async (req, res, next) => {
        try {
            const userId = req.user._id;
            await profileService.deleteAccount(userId);
            res.cookie("token", null, { expires: new Date(Date.now()) });
            res.json({ message: "Account deleted successfully" });
        } catch (error) {
            logger.error(error);
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    };

    return { view, edit, deleteAccount };
};

module.exports = createProfileController;
