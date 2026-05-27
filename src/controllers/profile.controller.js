const profileService = require("../services/profile.service");

const view = async (req, res) => {
    try {
        const user = await profileService.viewProfile(req.user);
        res.send(user);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
};

const edit = async (req, res) => {
    try {
        const loggedInUser = await profileService.editProfile(req.user, req.body);
        res.send(`${loggedInUser.firstName},  user updated succesfully`);
    } catch (error) {
        res.status(404).send("ERROR : " + error.message);
    }
};

module.exports = { view, edit };
