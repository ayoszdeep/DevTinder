const connectionRequestRepository = require("../repositories/connectionRequest.repository");
const userRepository = require("../repositories/user.repository");

const sendConnectionRequest = async (senderId, receiverId, status) => {
    const isAllowed = ["interested", "ignored"];
    if (!isAllowed.includes(status)) {
        throw new Error("send right status");
    }

    const touser = await userRepository.findById(receiverId);
    if (!touser) {
        throw new Error("not user there");
    }

    const existingOne = await connectionRequestRepository.findOne({
        $or: [
            { SenderConnection: senderId, RecieverConnection: receiverId },
            { SenderConnection: receiverId, RecieverConnection: senderId },
        ],
    });

    if (existingOne) {
        throw new Error("connection already exists");
    }

    const connectionRequest = connectionRequestRepository.createRequest({
        SenderConnection: senderId,
        RecieverConnection: receiverId,
        status
    });

    const data = await connectionRequestRepository.saveRequest(connectionRequest);
    return data;
};

const reviewConnectionRequest = async (loggedInUserId, status, requestId) => {
    const isAllowedStatus = ["accepted", "rejected"];
    if (!isAllowedStatus.includes(status)) {
        throw new Error("Invalid status. Use 'accepted' or 'rejected'.");
    }

    const connectionRequests = await connectionRequestRepository.findOne({
        _id: requestId,
        RecieverConnection: loggedInUserId,
        status: "interested",
    });

    if (!connectionRequests) {
        throw new Error("connection request is not valid ");
    }

    connectionRequests.status = status;
    const data = await connectionRequestRepository.saveRequest(connectionRequests);
    return data;
};

module.exports = { sendConnectionRequest, reviewConnectionRequest };
