const { BadRequestError, NotFoundError } = require("../utils/errors/app.error");
const { ALLOWED_REQUEST_STATUS, ALLOWED_REVIEW_STATUS } = require("../constants");

const createRequestService = ({ userRepository, connectionRequestRepository }) => {
    const sendConnectionRequest = async (senderId, receiverId, status) => {
        if (!ALLOWED_REQUEST_STATUS.includes(status)) {
            throw new BadRequestError("send right status");
        }

        const touser = await userRepository.findById(receiverId);
        if (!touser) {
            throw new BadRequestError("not user there");
        }

        const existingOne = await connectionRequestRepository.findOne({
            $or: [
                { SenderConnection: senderId, RecieverConnection: receiverId },
                { SenderConnection: receiverId, RecieverConnection: senderId },
            ],
        });

        if (existingOne) {
            throw new BadRequestError("connection already exists");
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
        if (!ALLOWED_REVIEW_STATUS.includes(status)) {
            throw new BadRequestError("Invalid status. Use 'accepted' or 'rejected'.");
        }

        const connectionRequests = await connectionRequestRepository.findOne({
            _id: requestId,
            RecieverConnection: loggedInUserId,
            status: "interested",
        });

        if (!connectionRequests) {
            throw new NotFoundError("connection request is not valid ");
        }

        connectionRequests.status = status;
        const data = await connectionRequestRepository.saveRequest(connectionRequests);
        return data;
    };

    return { sendConnectionRequest, reviewConnectionRequest };
};

module.exports = createRequestService;
