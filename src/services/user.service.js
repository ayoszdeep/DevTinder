const { toUserDTO, toUserDTOList } = require("../dtos/user.dto");
const { SAFE_USER_FIELDS } = require("../constants");

const createUserService = ({ userRepository, connectionRequestRepository }) => {
    const getReceivedRequests = async (userId) => {
        const connectionRequests = await connectionRequestRepository.find({
            RecieverConnection: userId,
            status: "interested"
        }).populate("SenderConnection", SAFE_USER_FIELDS);

        return connectionRequests;
    };

    const getConnections = async (userId) => {
        const connectionRequests = await connectionRequestRepository.find({
            $or: [
                { RecieverConnection: userId, status: "accepted" },
                { SenderConnection: userId, status: "accepted" }
            ]
        }).populate("SenderConnection", SAFE_USER_FIELDS)
          .populate("RecieverConnection", SAFE_USER_FIELDS);

        const data = connectionRequests.map((row) => {
            if (row.SenderConnection._id.toString() === userId.toString()) {
                return toUserDTO(row.RecieverConnection);
            }
            return toUserDTO(row.SenderConnection);
        });

        return data;
    };

    const getFeed = async (userId, page, pageLimit) => {
        const skip = (page - 1) * pageLimit;

        const connectionRequests = await connectionRequestRepository.find({
            $or: [
                { SenderConnection: userId },
                { RecieverConnection: userId }
            ]
        }).select("SenderConnection RecieverConnection");

        const excludeUsers = new Set();
        connectionRequests.forEach(request => {
            excludeUsers.add(request.SenderConnection.toString());
            excludeUsers.add(request.RecieverConnection.toString());
        });

        const users = await userRepository.findUsers({
            $and: [
                { _id: { $nin: Array.from(excludeUsers) } },
                { _id: { $ne: userId } }
            ]
        }, SAFE_USER_FIELDS.join(" ")).skip(skip).limit(pageLimit);

        return toUserDTOList(users);
    };

    return { getReceivedRequests, getConnections, getFeed };
};

module.exports = createUserService;
