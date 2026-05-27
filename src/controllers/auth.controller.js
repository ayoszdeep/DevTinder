const authService = require("../services/auth.service");

const signup = async (req, res) => {
    try {
        const user = await authService.signup(req.body);
        res.json({ message: "user has been added succesfully", data: user });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
};

const login = async (req, res) => {
    try {
        const { password, emailId } = req.body;
        const result = await authService.login(emailId, password);
        res.cookie("token", result.token);
        res.send("login successful");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const logout = async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("logout succesful");
};

module.exports = { signup, login, logout };
