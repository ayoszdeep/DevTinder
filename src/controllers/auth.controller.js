const logger = require("../utils/logger");
const { toUserDTO } = require("../dtos/user.dto");

const createAuthController = ({ authService }) => {
    const signup = async (req, res, next) => {
        try {
            const user = toUserDTO(await authService.signup(req.body));
            res.json({ message: "user has been added succesfully", data: user });
        } catch (error) {
            logger.error(error);
            res.status(error.statusCode || 400).send("Error: " + error.message);
        }
    };

    const login = async (req, res, next) => {
        try {
            const { password, emailId } = req.body;
            const result = await authService.login(emailId, password);
            res.cookie("token", result.token);
            res.send("login successful");
        } catch (error) {
            logger.error(error);
            res.status(error.statusCode || 400).send(error.message);
        }
    };

    const logout = async (req, res, next) => {
        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.send("logout succesful");
    };

    return { signup, login, logout };
};

module.exports = createAuthController;
