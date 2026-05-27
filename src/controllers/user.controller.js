const userService = require("../services/user.service");

const getReceivedRequests = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await userService.getReceivedRequests(loggedInUser._id);
        res.status(200).json({
            message: "Data fetched successfully",
            data: connectionRequests
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getConnections = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const data = await userService.getConnections(loggedInUser._id);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFeed = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        const pageLimit = parseInt(req.query.pageLimit) || 10;
        const users = await userService.getFeed(loggedInUser._id, page, pageLimit);
        res.status(200).json({
            message: "Feed data fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReceivedRequests, getConnections, getFeed };
