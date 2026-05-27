const requestService = require("../services/request.service");

const send = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.touserId;
        const status = req.params.status;
        const data = await requestService.sendConnectionRequest(senderId, receiverId, status);
        res.json({ message: "the data has been send", data });
    } catch (error) {
        switch (error.message) {
            case "send right status":
                return res.status(400).json({ message: "send right status" });
            case "not user there":
                return res.status(400).send("not user there");
            case "connection already exists":
                return res.status(400).send({ message: "connection already exists" });
            default:
                return res.status(400).send("ERROR THERE");
        }
    }
};

const review = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        const data = await requestService.reviewConnectionRequest(loggedInUser._id, status, requestId);
        res.status(200).json({ message: "successful data", data });
    } catch (error) {
        switch (error.message) {
            case "Invalid status. Use 'accepted' or 'rejected'.":
                return res.status(400).json({ message: error.message });
            case "connection request is not valid ":
                return res.status(404).json({ message: error.message });
            default:
                return res.status(500).json({ message: "Unable to review request", error: error.message });
        }
    }
};

module.exports = { send, review };
